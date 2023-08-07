import React, { useState } from 'react';
import classes from '../css/TeamEdit.module.css'
import { Modal } from '@mui/material';
import { useCreateTeamMutation } from '../../../redux/authApi';
import SelectInterns from './SelectInterns';
import alertify from 'alertifyjs';
import { useParams } from 'react-router-dom';


function CreateTeam({open, onClose, tutors, interns}) {
    const chInterns =  interns.map(intern => (
        {name: `${intern.last_name} ${intern.first_name} ${intern?.patronymic ?? ""}`,
        id_intern:intern.id })
         )
    const {projectId} = useParams();
    const [curName, setCurName] = useState("");
    const [curTutor, setCurTutor] = useState(tutors[0].id);
    const [selectedValues, setSelectedValues] = useState([]);
    
    const [createTeam] = useCreateTeamMutation()

    const sendEditedTeam =  async () => {
        const body = {
            "id_project": projectId,
            "id_tutor": curTutor,
            "interns": selectedValues,
            "title": curName,
            "team_chat": null,
            "teg": curName
        }
        const res = await createTeam({ body});
        if (!res.error){
            alertify.notify("команда успешно создана", "success");
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
            <h2>создать команду</h2>
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
                <button onClick={sendEditedTeam} className={classes["create"]}>Создать</button>
            </div>
        </div>
    </Modal>
    );
}

export default CreateTeam