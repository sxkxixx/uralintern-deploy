import React, { useState } from 'react';
import classes from "../css/Form.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../../redux/authApi';
import { setCredentials } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import alertify from 'alertifyjs';

function AuthForm({setIsPasswordForgotten, passwordResetSucceeded}) {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, {isLoading}] = useLoginMutation()
    const handle = async () => {
        const data = await login({email, password});
        if(data.error){
            //console.log(data.error)
            alertify.error(data.error);
            return
        }
        dispatch(setCredentials({...data.data}));
        setEmail("");
        setPassword("");
        const user = jwtDecode(data.data.access);
        alertify.notify("", "success");
        navigate(`/user/${user.user_id}`);
    }
    return (
    <div>
        <hr/>
        <div className={classes["fields"]}>
            <div className={classes["password-reseted"]}>{passwordResetSucceeded ? 'Пароль был успешно изменён.' : ''}</div>
            <input type="email" className={classes["inp"]} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Почта"/>
            <input type="password" className={classes["inp"]}  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль"/>
            <a href={'#'} className={classes["forgot-password"]}
               onClick={(evt) => {
                   evt.preventDefault();
                   setIsPasswordForgotten(true);
               }
            }>Забыли пароль?</a>
        </div>
        <div className={classes["button"]}>
            <button className={classes["enter-button"]} onClick={handle}>Войти</button>
        </div>
    </div>
    );
}

export default AuthForm;
