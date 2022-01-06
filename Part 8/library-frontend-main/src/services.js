import { gql } from "@apollo/client";

const getAllPersons = gql`
  query Authors {
    authors {
      name
      born
      bookCount
    }
  }
`;

const getAllBooks = gql`
  query Books {
    books {
      title
      published
      id
      genres
      author {
        name
        born
        id
        bookCount
      }
    }
  }
`;

const addBookMutation = gql`
  mutation Mutation(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`;

const updateAuthorBirthyear = gql`
  mutation UpdateAuthor($born: Int!, $name: String) {
    updateAuthor(born: $born, name: $name) {
      name
      born
    }
  }
`;
const login = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const getUserData = gql`
  query Me {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

const getFavoriteGenre = gql`
  query Query($genre: String) {
    findBook(genre: $genre) {
      title
      published
      id
      genres
      author {
        name
        born
        id
        bookCount
      }
    }
  }
`;

export {
  getAllPersons,
  getAllBooks,
  addBookMutation,
  updateAuthorBirthyear,
  login,
  getUserData,
  getFavoriteGenre,
};
