import React, {useState} from "react";
import FormResetHeader from "./FormResetHeader";
import classes from "../css/Form.module.css";
import {NavLink, useLocation} from "react-router-dom";
import {useChangePasswordMutation} from "../../../redux/authApi";
import {useNavigate} from "react-router-dom";

const PasswordReset = ({onChange, form}) => {
    const [passwordsAreSimilar, setPasswordsAreSimilar] = useState(true);
    const [passwordResetSucceeded, setPasswordResetSucceeded] = useState(true);

    const navigate = useNavigate();

    const url = useLocation();
    const token = url.search.slice(7);

    const [resetPassword, setResetPassword] = useState({
        'password': '',
        token
    });

    const [resPass, {isError, isSuccess}] = useChangePasswordMutation();

    const resetPass = async () => {
        const abc = resPass(resetPassword);
        if (!abc.error){
            navigate("/login", {state: {passwordResetSucceeded}});
            setPasswordResetSucceeded(true);
        } else {
            setPasswordResetSucceeded(false);
        }
    }

    return (
            <>
            <hr/>
                <div className={classes["fields"]}>
                    <div className={classes["password-reset"]}>Введите новый пароль:</div>
                    <input type="password" value={resetPassword.password} onChange={e => setResetPassword({...resetPassword, password: e.target.value})} placeholder="Пароль"/>
                    <div className={classes["password-reset"]}>Введите новый пароль ещё раз:</div>
                    <input type="password" value={resetPassword.password2} onChange={e => setPasswordsAreSimilar(resetPassword.password === e.target.value)} placeholder="Подтверждение пароля"/>
                    <div className={`${classes["password-reset"]} ${classes['reset-is-blocked']}`}>{!passwordsAreSimilar ? 'Пароли должны совпадать!' : ''}</div>
                    <div className={`${classes["password-reset"]} ${classes['reset-is-blocked']}`}>{!passwordResetSucceeded ? 'Произошла ошибка, попробуйте снова!' : ''}</div>
                </div>
                <div className={`${classes["button"]}`}>
                    <button className={`${classes["enter-button"]} ${!passwordsAreSimilar ? classes['reset-button-disabled'] : ''}`} onClick={resetPass} disabled={!passwordsAreSimilar}>Подтвердить изменения</button>
                </div>
            </>
    )
}

export default PasswordReset;
