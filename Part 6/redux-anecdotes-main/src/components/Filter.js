import { useDispatch, useSelector } from "react-redux";
import { changeValue } from "../reducers/filterReducer";

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  return (
    <div>
      Filter{" "}
      <input
        type="text"
        value={filter}
        onChange={({ target }) => dispatch(changeValue(target.value))}
      />
    </div>
  );
};

export default Filter;
