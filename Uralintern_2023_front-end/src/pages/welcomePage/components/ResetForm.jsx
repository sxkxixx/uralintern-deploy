import classes from "../css/Form.module.css"
import React, {useState} from "react";
import {useResetMutation} from "../../../redux/authApi";

const ResetForm = ({setIsPasswordResetSucceed}) => {
    const [resetForm, setResetForm] = useState({
        "email": "",
    });

    const [res, {isError, isSuccess}] = useResetMutation()

    const reset = async () => {
        const abc = await res(resetForm);
        if (!abc.error){
            setIsPasswordResetSucceed(true);
            console.log(abc)
        } else {
            console.log('не круто')
        }
    }

    return (
        <>
            <hr/>
            <p className={classes['reset-description']}>Введите адрес электронной почты, который вы указывали при регистрации. На эту почту будет отправлено письмо с информацией для восстановления пароля.</p>
            <div className={classes["fields"]}>
                <input type="email" value={resetForm.email} onChange={e => setResetForm({...resetForm, email: e.target.value})} placeholder="Почта"/>
            </div>
            <div className={classes["button"]}>
                <button className={classes["enter-button"]} onClick={reset}>Отправить</button>
            </div>
        </>
    )
}

export default ResetForm;
