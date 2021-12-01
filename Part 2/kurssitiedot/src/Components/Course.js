import React from "react";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";


const Course = ({ course }) => {

    return (
        <div>
            {course.map((item, index) => {
                return (

                    <div key={index}>
                        <Header course={item.name} />
                        <Content parts={item.parts} />
                        <Total parts={item.parts} />
                    </div>

                )
            })}
        </div>
    )
}

export default Course