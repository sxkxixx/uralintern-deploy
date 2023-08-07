import React, { useState } from 'react';
import classes from "../css/Stages.module.css"
import EditStage from './EditStage';
function Stage({stage, criteria}) {
    const [open, setOpen] = useState(false);


    return (
        <li key={stage.id} className={classes['command-info-person']}>
        <div className={classes["number"]}>{stage.id}</div>
        <div className={classes["name"]}>{stage.title}</div>
        <div className={classes["date-start-end"]}>{`${stage.start_date}  ${stage.end_date}`}</div>
        <div className={classes["date"]}>{`${stage.start_date} ${stage.end_estimation_date}`}</div>
        <div className={classes["status"]}>
            <div className={classes["item-status"]}>{stage.is_active? "Оцениваемый": "не оцениваемый"}</div>
            <select className={classes["criteria"]} name="form-selector1" id="form-selector1">
                {stage.evaluation_criteria.map(crit => <option key={crit.id} disabled>{crit.title}</option> )}
                <option value="" disabled selected hidden>Критерии</option>
            </select>
            <div className={classes["link-pen"]} onClick={() => setOpen(true)} >
            <img 
                
                src={require("../../../images/pen.svg").default}
                width="16" height="16" alt="Карандаш"
            />
            </div>
        </div>
        {open && <EditStage open={open} onClose={() => setOpen(false)} stage={stage} criteria={criteria}/>}
    </li>
    );
}

export default Stage;