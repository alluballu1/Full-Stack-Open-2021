const Filter = ({ filterValue, filterInput }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        type="text"
        value={filterValue}
        onChange={filterInput}
        id={"filter"}
      />
    </div>
  );
};

export default Filter;
