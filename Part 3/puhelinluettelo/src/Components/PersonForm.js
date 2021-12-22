const PersonForm = ({
  nameValue,
  nameChangeFunction,
  numValue,
  numChangeFunction,
  submit,
}) => {
  return (
    <form onSubmit={submit}>
      <div>
        name:{" "}
        <input
          type="text"
          value={nameValue}
          onChange={nameChangeFunction}
          id={"name"}
        />
      </div>
      <div>
        number:{" "}
        <input
          type="text"
          value={numValue}
          onChange={numChangeFunction}
          id={"num"}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
