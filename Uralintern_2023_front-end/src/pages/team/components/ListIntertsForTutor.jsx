import React from 'react';
import classes from '../css/TeamForTutor.module.css'
import InternForTutor from './InternForTutor';

function ListIntertsForTutor({interns}) {
    return (
<ul className={classes["main-ul"]}>
            <li className={classes['command-info-person-head']}>             
                    <div className={`${classes["empty"]} ${classes["photo"]}`}></div>
                    <div className={`${classes["empty"]} ${classes["fio"]}`}>ФИО</div>
                    <div className={`${classes["empty"]} ${classes["contacts"]}`}>Контакты</div>
                    <div className={`${classes["empty"]} ${classes["education"]}`}>Оценка этапа</div>
                    <div className={`${classes["empty"]} ${classes["forms"]}`}>Статистика</div>
                    <div className={`${classes["empty"]} ${classes["table"]}`}>Полная статистика</div>
            </li>
        {interns.map(intern => <InternForTutor intern={intern}/>)}
        </ul>
    );
}

export default ListIntertsForTutor;