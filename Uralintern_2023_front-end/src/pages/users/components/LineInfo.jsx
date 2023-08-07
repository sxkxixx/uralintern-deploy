import React, { useState } from 'react';
import classes from '../css/ChangeUser.module.css'
import { useChangeUserInfoMutation } from '../../../redux/authApi';
import { useSelector } from 'react-redux';
import alertify from 'alertifyjs';


function LineInfo({title, values, name}) {
    const {user} = useSelector(state => state.auth);
    
    const [isEdit, setIsEdit] = useState(false);
    const [changeInfo] = useChangeUserInfoMutation();
    const [inp, setInp] = useState(values[name])

    const cancel = () =>{
        setInp(values[name])
        setIsEdit(false)
    }

    const sendNewInfo = async () =>{
        const body = {...values, [name]:inp.length > 0? inp:null};
        const res = await changeInfo({id: user.user_id, body});
        if (!res.error){
            alertify.notify("поле успешно изменено", "success")
            cancel();
        }else{
            res.error.data[name].forEach(error => alertify.error(error));
        }
    }

    if (isEdit){
        return     (
        <div className={`${classes["inp-container"]}`}>
            {title}:
            <input type="text" value={inp} onChange={(e) => setInp(e.target.value)} placeholder='нет данных'  className={classes["inp"]} />
            <div onClick={() => sendNewInfo()} className={classes["yes"]}>
                <img className={classes["link-pen"]}   src={require("../../../images/Y.svg").default} width="16" height="16" alt="Карандаш"/>
            </div>
            <div  onClick={() => cancel()} className={classes["cancel"]}>
                <img className={classes["link-pen"]} src={require("../../../images/cross.svg").default} width="16" height="16" alt="Карандаш"/>
            </div>
        </div>)
    }

    return (
    <div className={`${classes["line-container"]}`}>{title}:
        <div className={classes["inf"]}>{values[name] ?? "нет данных"}</div>
        <div className={classes["pen"]}  onClick={() => setIsEdit(true)} >
            <img className={classes["link-pen"]} src={require("../../../images/pen.svg").default} width="16" height="16" alt="Карандаш"/>
        </div>
    </div>

    );
}

export default LineInfo;