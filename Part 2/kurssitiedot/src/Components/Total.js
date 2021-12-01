import React from "react";

const Total = ({ parts }) => {
    let totalNum = 0
    parts.forEach(element => {
        totalNum += element.exercises
    });
    return (
        <p style={{ fontWeight:"bold" }}>Number of exercises {totalNum}</p>
    )
}

export default Total