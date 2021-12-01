import React from "react";

const Names = ({ persons }) => {
    return (
        <div>
            {persons.map((item, index) => {
                return (
                    <div key={index}>
                        {item.name} {item.number}
                    </div>
                )
            })}
        </div>

    )
}

export default Names