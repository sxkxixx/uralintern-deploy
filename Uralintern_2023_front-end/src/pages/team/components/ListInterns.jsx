import React from 'react';
import classes from '../css/Team.module.css'
import Intern from './Intern';

function ListInterns({interns}) {
    return (
    <ul className={classes["main-ul"]}>
        <li className={classes['command-info-person-head']}>                 
            <div className={`${classes["empty"]} ${classes["photo"]}`}></div>
            <div className={`${classes["text"]} ${classes["fio"]}`} >Участник</div>
            <div className={`${classes["text"]} ${classes["contacts"]}`}>Контакты</div>
            <div className={`${classes["text"]} ${classes["education"]}`}>Образование</div>
        </li>
        {interns.map(intern => <Intern intern={intern}/>)}
    </ul>
    );
}

export default ListInterns;