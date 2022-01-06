require("dotenv").config();
const {
  ApolloServer,
  UserInputError,
  gql,
  ValidationError,
  AuthenticationError,
} = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { v1: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "THIS_IS_A_SUPER_SECRET_KEY";

console.log("connecting to", process.env.MONGODB_URL);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }
  type Token {
    value: String!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Mutation {
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
    updateAuthor(name: String, born: Int!): Author
    createAuthor(name: String!, born: Int!): Author
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
  }

  type Query {
    me: User
    allBooks: Int!
    authorCount: Int!
    books: [Book]
    authors: [Author]
    findAuthor(name: String!): Author
    findBook(title: String, genre: String): [Book!]!
  }
`;

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    allBooks: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    books: async (root, args) => {
      return await Book.find({}).populate("author");
    },
    authors: async (root, args) => {
      return await Author.find({});
    },
    findAuthor: async (root, args) => {
      const result = await Author.findOne({ name: args.name });
      return result;
    },
    findBook: async (root, args) => {
      if (args.title && !args.genre) {
        const result = await Book.findOne({ title: args.title }).populate(
          "author"
        );
        return result;
      } else if (!args.name && args.genre) {
        const result = Book.find({ genres: { $in: [args.genre] } }).populate(
          "author"
        );
        return result;
      } else {
        const result = await Book.findOne({ title: args.title })
          .find({ genres: { $in: [args.genre] } })
          .populate("author");
        return result;
      }
    },
  },
  Author: {
    bookCount: async (root) => {
      const result = await Book.find({ author: root._id }).countDocuments();
      return result;
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        await user.save();
      } catch (err) {
        throw new UserInputError(error.message);
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "12345") {
        throw new UserInputError("Wrong credentials, try again.");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    updateAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("No authentication");
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.born;
      try {
        await author.save();

        return author;
      } catch (err) {
        throw new ValidationError(err.message);
      }
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("No authentication");
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const tempAuth = new Author({ name: args.author, id: uuid() });
        try {
          author = await tempAuth.save();
        } catch (err) {
          throw new ValidationError(err.message);
        }
      }
      try {
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: [...args.genres],
          author: author._id,
          id: uuid(),
        });
        await book.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    createAuthor: async (root, args) => {
      const author = new Author({ ...args, id: uuid() });
      try {
        await author.save();
      } catch (err) {
        throw new ValidationError(err.message);
      }
      return author;
    },
  },
};

const server = new ApolloServer({
  playground: true,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    console.log(auth);
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
