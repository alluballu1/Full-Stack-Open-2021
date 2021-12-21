const SearchBar = ({ input, valueChange }) => {
  return (
    <div className="App">
      find countries
      <input value={input} onChange={valueChange} id="searchBar" />
    </div>
  );
};
export default SearchBar;
