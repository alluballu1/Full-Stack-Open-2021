import React from "react";

const StatisticsLine = ({text, value}) => {
    return(
        <table>
            <tr>
                <td>
                    {text}
                </td>
                <td>
                    {value}
                </td>
            </tr>
            
        </table>
    )
}

export default StatisticsLine