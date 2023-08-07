import React, { useState } from 'react';
import classes from '../css/Stages.module.css'
import { Modal } from '@mui/material';
import SelectCriteria from './SelectCriteria';
import { useCreateStageMutation, usePutStageMutation } from '../../../redux/authApi';
import dateFormat from 'dateformat';
import { useParams } from 'react-router-dom';


function CreateStage({criteria, open, onClose}) {
    const {teamId} = useParams();
    const [title, setTtle] = useState("");
    const [start, setStart] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
    const [endDate, setEndDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
    const [estDate, setEstDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
    const [selectedCriteria, setSelectedCriteria] = useState([]);
    const [createStage] = useCreateStageMutation()
    
    const sendEdit = async () =>{
        const body = { description: "",
            end_date:endDate,
            start_date:start,
            end_estimation_date:estDate,
            id_team:teamId,
            is_active:true,
            title,
            evaluation_criteria:selectedCriteria
        }
        await createStage({body});
        onClose();
    }


    return (
        <Modal open={open} onClose={onClose}  sx={{position: "absolute"}} disableScrollLock={true} disableAutoFocus={true}  >
        <div className={classes["stage-create-form"]}>
        <img className={classes["img"]}
            src={require("../../../images/cross-white.svg").default}
            width="26.68" height="26.68"
            alt="Белый крестик"/>
        
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

export default CreateStage;