import React, { useState } from 'react';
import classes from '../css/TeamEdit.module.css'
import { Modal } from '@mui/material';
import { useGetTutorsInterntsQuery, usePutTeamMutation } from '../../../redux/authApi';
import SelectInterns from './SelectInterns';
import alertify from 'alertifyjs';


function EdtiTeam({open, onClose, team, tutors, interns}) {
    const chInterns =  interns.map(intern => (
        {name: `${intern.last_name} ${intern.first_name} ${intern?.patronymic ?? ""}`,
        id_intern:intern.id })
         )
    const setInterns = new Set(team.interns.map(intern => intern.id_intern));
    

    const [curName, setCurName] = useState(team.title);
    const [curTutor, setCurTutor] = useState(team.id_tutor);
    const [selectedValues, setSelectedValues] = useState(chInterns.filter(intern => setInterns.has(intern.id_intern)));
    
    const [editTeam] = usePutTeamMutation();

    const sendEditedTeam =  async () => {
        const body = {
            "id_project": team.id_project,
            "id_tutor": curTutor,
            "interns": selectedValues,
            "title": curName,
            "team_chat": team.team_chat,
            "teg": curName
        }
        const res = await editTeam({id:team.id, body})
        if (!res.error){
            alertify.notify("команда успешно изменена", "success");
        }
        onClose();
    }

    return (
        <Modal sx={{position: "absolute"}} disableScrollLock={true} disableAutoFocus={true}  open={open} onClose={onClose}>
        <div className={classes["team-create-form"]}>
            <div className={classes["img"]} onClick={() => onClose()}>
            <img src={require("../../../images/cross-white.svg").default}
                
                width="26.68" height="26.68"
                alt="Белый крестик"/>
            </div>
            <h2>Редактировать команду</h2>
            <div className={classes["fields"]}>
                <div>
                    <p>Название</p>
                    <input value={curName} onChange={e => setCurName(e.target.value)} type="text"/>
                </div>
                <div>
                    <p>Куратор</p>
                    <select
                        onChange={e => setCurTutor(e.target.value)}
                        className={classes["one-selector"]}
                        defaultValue={curTutor}
                        name="form-selector"
                        id="form-selector">
                        
                        {tutors.map(tutor =>  <option value={tutor.id}>{ `${tutor.last_name} ${tutor.first_name} ${tutor?.patronymic ?? ""}`} </option>)}
                    </select>
                </div>
                <div>
                <p>Стажеры</p>
                <SelectInterns interns={chInterns}
                    selectedValues={selectedValues}
                    onRemove={(selectedList, remItem) => setSelectedValues([...selectedList])}
                    onSelect={(selectedList, selItem) => setSelectedValues([...selectedList])}
                />
                </div>
            </div>
            <div className={classes["button-create"]}>
                <button onClick={sendEditedTeam} className={classes["create"]}>Изменить</button>
            </div>
        </div>
    </Modal>
    );
}

export default EdtiTeam;