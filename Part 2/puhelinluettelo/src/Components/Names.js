import React from "react";

const Names = ({ persons }) => {
  return (
    <div>
      <table>
        {persons.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.number}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Names;
