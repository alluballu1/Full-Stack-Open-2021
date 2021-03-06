import React from "react";

const Names = ({ persons, deletion }) => {
  return (
    <div>
      <table>
        <tbody>
          {persons.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.number}</td>
                <td>
                  <button onClick={() => deletion(item.id, item.name)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Names;
