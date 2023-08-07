import React, { useState } from 'react';
import classes from './css/project.module.css'
import { useGetProjectQuery, useGetTutorsInterntsQuery } from '../../redux/authApi';
import { useNavigate, useParams } from 'react-router-dom';
import ListTeams from './components/ListTeams';
import CreateTeam from './components/CreateTeam';
function Project() {
    const {projectId} = useParams();
    const navigate = useNavigate();
    const project = useGetProjectQuery({id: projectId});
    const tutorsInternts =  useGetTutorsInterntsQuery();
    const [open, setOpen] = useState(false);
    if (project.isLoading || tutorsInternts.isLoading){
        return <div></div>
    }

    return (
        <div className={classes["main"]}>
            {open && <CreateTeam onClose={() => setOpen(false)} open={open} tutors={tutorsInternts.data.tutors} interns={tutorsInternts.data.interns}/>}
        <div className={classes["project"]}>
            <div className={classes["project-info"]}>
                <h2>Проект "{project.data.title}"</h2>
                <div className={classes["info"]}>
                    <p>Даты начала-окончания проекта: {project.data.start_date} - {project.data.end_date}</p>
                    <div className={classes["statistics-and-link"]} onClick={() => navigate(`/projectInerns/${projectId}`)}>
                        <p className={classes["statistics-link"]}>Перейти к статистике моих стажёров</p>
                        <img className={classes["link"]} src={require("../../images/link.svg").default} width="24" height="24" alt="Ссылка статистика стажёров"/>
                    </div>
                </div>
            </div>
            <ListTeams tutors={tutorsInternts.data.tutors} interns={tutorsInternts.data.interns} teams={project.data.teams}/>
            <div className={classes["button"]}>
                <button className={classes["team-create"]} onClick={() => setOpen(true)}>Создать команду</button>
            </div>
        </div>
        </div>
    );
}

export default Project;