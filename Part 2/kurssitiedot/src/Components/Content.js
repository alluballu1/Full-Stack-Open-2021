import React from "react";
import Part from "./Parts";

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((item, index) => {
                return (
                    <Part key={index} part={item.name} exercise={item.exercises} />
                )
            })}
        </div>
    );
}
export default Content