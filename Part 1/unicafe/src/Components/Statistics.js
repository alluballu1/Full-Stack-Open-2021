import React from "react";
import StatisticsLine from "./StatisticsLine";

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const average = ((good - neutral) / all).toFixed(2)
    const positive = (good / all).toFixed(2)
    return (
        <div>
            <h1>
                statistics
            </h1>
            {
                all === 0 ?
                    <p>
                        no feedback given
                    </p>
                    :
                    <table>
                    <tr>
                        <td>
                            <StatisticsLine text={"good"} />
                        </td>
                        <td>
                            {good}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <StatisticsLine text={"neutral"} />
                        </td>
                        <td>
                            {neutral}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <StatisticsLine text={"bad"} />
                        </td>
                        <td>
                            {bad}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <StatisticsLine text={"all"} />
                        </td>
                        <td>
                            {all}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <StatisticsLine text={"average"} />
                        </td>
                        <td>
                            {average}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <StatisticsLine text={"positive"} />
                        </td>
                        <td>
                            {positive}%
                        </td>
                    </tr>
                </table>
            }
        </div>
    )
}

export default Statistics