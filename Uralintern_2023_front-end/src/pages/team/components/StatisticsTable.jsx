import React from 'react';
import classes from '../css/TeamForTutor.module.css'
import { useGetEstimationsQuery } from '../../../redux/authApi';
function StatisticsTable({userId, teamId, open}) {
    const estimations = useGetEstimationsQuery({userId, teamId} );
    console.log(estimations);
    if (estimations.isLoading){
        return <table>
            <tr>
                <th>Критерий</th>
                <th>Оценка</th>
            </tr>
            <tr>
                <td className={classes["criteria"]}>...</td>
                <td className={classes["mark"]}>...</td>
            </tr>
            <tr>
                <td className={classes["criteria"]}>...</td>
                <td className={classes["mark"]}>...</td>
            </tr>
        </table>
    }
    return (
        <table className={open ? "" : classes["hidden"]}>
            <tr>
                <th>Критерий</th>
                <th>Оценка</th>
            </tr>
            {estimations.data.total_estimation.map(est =>
                {return <tr>
                    <td className={classes["criteria"]}>{est.evaluation_criteria}</td>
                    <td className={classes["mark"]}>{est.estimation}</td>
                </tr>})
                }
        </table>
    );
}

export default StatisticsTable;
