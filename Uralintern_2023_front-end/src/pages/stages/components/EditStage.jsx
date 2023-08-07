import React, { useState } from 'react';
import classes from '../css/Stages.module.css'
import { Modal } from '@mui/material';
import SelectCriteria from './SelectCriteria';
import { usePutStageMutation } from '../../../redux/authApi';
import dateFormat from 'dateformat';

function EditStage({stage, criteria, open, onClose}) {
    const [title, setTtle] = useState(stage.title);
    const [start, setStart] = useState(stage.start_date);
    const [endDate, setEndDate] = useState(stage.end_date);
    const [estDate, setEstDate] = useState(stage.end_estimation_date);
    const [selectedCriteria, setSelectedCriteria] = useState(stage.evaluation_criteria);
    const [editStage] = usePutStageMutation();
    
    const sendEdit = async () =>{
        const body = { description:stage.description,
            end_date:endDate,
            start_date:start,
            end_estimation_date:estDate,
            id_team:stage.id_team,
            is_active:true,
            title,
            evaluation_criteria:selectedCriteria
        }
        await editStage({id:stage.id, body});
        onClose();
    }


    return (
        <Modal open={open} onClose={onClose}  sx={{position: "absolute"}} disableScrollLock={true} disableAutoFocus={true}  >
        <div className={classes["stage-create-form"]}>
        <div className={classes["img"]} onClick={() => onClose()}>
            <img src={require("../../../images/cross-white.svg").default}
                
                width="26.68" height="26.68"
                alt="Белый крестик"/>
            </div>
        
        <h2>Редактировать этап</h2>
        <div className={classes["fields"]}>
            <div>
                <p>Название</p>
                <input type="text" value={title} onChange={(e) => setTtle(e.target.value) }/>
            </div>
            <div>
                <p>Дата начала</p>
                <input type="date" value={start} onChange={(e) => setStart(e.target.value)}/>
            </div>
            <div>
                <p>Дата окончания</p>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
            </div>
            <div>
                <p>Дата для оценки</p>
                <input type="date" value={estDate} onChange={(e) => setEstDate(e.target.value)}/>
            </div>
            <div>
                <p>критерии</p>
                <SelectCriteria
                    criteria={criteria}
                    selectedCriteria={selectedCriteria}
                    onRemove={(list, item) => setSelectedCriteria([...list])}
                    onSelect={(list, item) => setSelectedCriteria([...list])}
                />
            </div>
        </div>
        <div className={classes["button-create"]}>
          <button className={classes["create"]} onClick={sendEdit}>Сохранить</button>
          {/* <button className={classes["cancel"]}>Удалить</button> */}
        </div>
    </div>
    </Modal>
    );
}

export default EditStage;