import React from 'react';
import RadarGraph from './components/RadarGraph';
import classes from "./css/Report.module.css"
import { useParams } from 'react-router-dom';
import { useGetEstimationsQuery } from '../../redux/authApi';

function Report() {
    const {userId, teamId} = useParams();
    const {data, isLoading} = useGetEstimationsQuery({userId, teamId});
    
    if (isLoading){
        return <div></div>
    }
    //console.log(data);
    //console.log(data.self_estimation.map((est) => Number(est.estimation) < -2? -1 :est.estimation ))
    //console.log(data.self_estimation.map((est) => est.evaluation_criteria ))
    return (
        <div className={classes["main"]}>

            <div className={classes["report-info"]}>
                <h1 className={classes["report-info-h1"]}>Отчёты</h1>
                <h2 className={classes["report-info-h2"]}>Общая</h2>
                <RadarGraph 
                    labels={data.total_estimation.map((est) => est.evaluation_criteria )}
                    legend="Общая"
                    values={data.total_estimation.map((est) =>est.estimation )}
                />
                <h2 className={classes["report-info-h2"]}>Самооценка</h2>
                <RadarGraph
                    labels={data.self_estimation.map((est) => est.evaluation_criteria )}
                    legend="Самооценка"
                    values={data.self_estimation.map((est) =>est.estimation )}
                />
                <h2 className={classes["report-info-h2"]}>Оценка команды</h2>
                <RadarGraph
                    legend="Оценка команды"
                    labels={data.team_estimation.map((est) => est.evaluation_criteria )}
                    values={data.team_estimation.map((est) => est.estimation )}
                />
            </div>
        </div>
    );
}

export default Report;