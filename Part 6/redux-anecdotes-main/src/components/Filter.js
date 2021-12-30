import { connect, useDispatch, useSelector } from "react-redux";
import { changeValue } from "../reducers/filterReducer";

const Filter = (props) => {
  const filter = props.filter;
  return (
    <div>
      Filter{" "}
      <input
        type="text"
        value={filter}
        onChange={({ target }) => props.changeValue(target.value)}
      />
    </div>
  );
};

const mapDispatchToProps = {
  changeValue,
};
const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const ConnectedFilters = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default ConnectedFilters;
