import { useState } from "react";

const useField = (content) => {
  const [value, setvalue] = useState("");
  const onChange = (event) => {
    if (event.target !== undefined) {
      setvalue(event.target.value);
    } else {
      setvalue(event);
    }
  };
  return { content, value, onChange };
};

export default useField;
