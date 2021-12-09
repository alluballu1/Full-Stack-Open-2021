import React from "react";

const Names = ({ persons }) => {
  return (
    <div>
      <table>
        <tbody>
          {persons.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.number}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Names;
