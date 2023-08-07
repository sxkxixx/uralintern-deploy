import React, { useEffect, useState } from 'react';
import classes from "./css/Stages.module.css"
import Stage from './components/Stage';
import { useParams } from 'react-router-dom';
import { useGetListCriteriaQuery, useGetStagesQuery, useLazyGetProjectQuery, useLazyGetTeamQuery } from '../../redux/authApi';
import CreateStage from './components/CreateStage';
function Stages() {
    const {teamId} = useParams();
    const [open, setOpen] = useState(false);
    const stages = useGetStagesQuery({id: teamId});
    const [triggerTeam] = useLazyGetTeamQuery();
    const [team, setTeam] = useState();

    const criteria = useGetListCriteriaQuery();
    const [triggerProj] = useLazyGetProjectQuery()
    const [project, setProject] = useState()
    useEffect(() =>{
        const getTeamAndProj = async() =>{
            const resTeam = await triggerTeam({id: teamId}, true);
            const proj = await triggerProj({id:resTeam.data.id_project}, true);
            setTeam(resTeam.data);
            setProject(proj.data);
        }
        getTeamAndProj();
    },[teamId])
    
    if(stages.isLoading || criteria.isLoading || !project || !team){
        return <div></div>;
    }
    //console.log(project);
    //console.log(team);
    return (<div className={classes["main"]}>
<div className={classes["stages-main"]}>
            <div className={classes["stages-info"]}>
                <h2>Этапы</h2>
                <div className={classes["info"]}>
                    <p>Проект: {project.title}</p>
                    <p>Команда: {team.title}</p>
                </div>
            </div>
            <div className={classes["table"]}>
                <ul style={{padding:0}} className={classes["main-ul"]}>
                        <li className={classes['command-info-person-head']}>
                            <div className={classes["number"]}>Номер</div>
                            <div className={classes["name"]}>Название</div>
                            <div className={classes["date-start-end"]}>Дата начала-окончания</div>
                            <div className={classes["date"]}>Дата для оценки</div>
                            <div className={classes["status"]}>Статус</div>
                        </li>
                        {stages.data.map(stage => <Stage criteria={criteria.data} stage={stage}/>)}

                </ul>
            </div>
            {open && <CreateStage criteria={criteria.data} open={open} onClose={() => setOpen(false)} />}
            <div className={classes["button"]}>
                <button className={classes["stage-create"]} onClick={() => setOpen(true)}>создать этап</button>
            </div>
        </div>
    </div>
    );
}

export default Stages;