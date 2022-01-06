import { useQuery } from "@apollo/client";
import { getFavoriteGenre } from "../services";

const RecommendedBooks = (props) => {
  const favoriteGenres = useQuery(getFavoriteGenre, {
    variables: { genre: props.data.me.favoriteGenre },
  });

  if (!props.show) {
    return null;
  }

  if (favoriteGenres.loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre: {props.data.me.favoriteGenre}
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {favoriteGenres.data.findBook.map((element, index) => {
              return (
                <tr>
                  <td>{element.title}</td>
                  <td>{element.author.name}</td>
                  <td>{element.published}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecommendedBooks;
