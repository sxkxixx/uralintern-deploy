import React from 'react';
import classes from '../css/ProjectInterns.module.css'
import InternProj from './InternProj';
function ListInternProj({interns}) {


    return (
        <div className={classes["data"]}>
            <ul className={classes["main-ul"]}>
                <li className={classes['command-info-person-head']}>
                        <div className={`${classes["empty"]} ${classes["photo"]}`}></div>
                        <div className={`${classes["text"]} ${classes["fio"]}`}>ФИО</div>
                        <div className={`${classes["text"]} ${classes["role"]}`}>Роль</div>
                        <div className={`${classes["text"]} ${classes["team"]}`}>Команда</div>
                        <div className={`${classes["text"]} ${classes["criteria"]}`}>Баллы по кртериям</div>
                </li>
            {interns.map(intern => <InternProj intern={intern}/>)}
            </ul>
        </div>
    );
}

export default ListInternProj;