import React, { useState } from 'react';
import classes from '../css/Form.module.css'
import {useRegisterMutation} from '../../../redux/authApi';
import { async } from 'validate.js';
import alertify from 'alertifyjs';


function RegistrationForm({onChange}) {
    const [registerForm, setRegisterForm] = useState({
        "email": "",
        "password": "",
        "password2": "",
        "first_name": "",
        "last_name": "",
        "patronymic": "",
        "image": null,
        "groups": []
    })
    const [reg, {isError, isSuccess}] = useRegisterMutation()

    const register = async () =>{
        const abc = await reg(registerForm);
        console.log(useRegisterMutation)
        if (!abc.error){
            alertify.notify("регистрация прошла успешно!",  "success");
            onChange(1);
        }else{
            //console.log(abc.error.data);
            for(let key in abc.error.data){
                if (key === "email"){
                    alertify.error("такая почта занята");
                } else {
                    for (let er of abc.error.data[key])
                        alertify.error(`${er}`);
                }
            }
        }
    }

    return (
        <div>
        <hr/>
            <div className={classes["fields"]}>
            <input type="text" value={registerForm.first_name} onChange={e => setRegisterForm({...registerForm, first_name: e.target.value})}  placeholder="Имя*"/>
            <input type="text" value={registerForm.last_name} onChange={e => setRegisterForm({...registerForm, last_name: e.target.value})}  placeholder="Фамилия*"/>
            <input type="text" value={registerForm.patronymic} onChange={e => setRegisterForm({...registerForm, patronymic: e.target.value})}  placeholder="Отчество"/>
            <input type="email" value={registerForm.email} onChange={e => setRegisterForm({...registerForm, email: e.target.value})}  placeholder="Email*"/>
            <input type="password" value={registerForm.password} onChange={e => setRegisterForm({...registerForm, password: e.target.value})}  placeholder="Пароль*"/>
            <input type="password" value={registerForm.password2} onChange={e => setRegisterForm({...registerForm, password2: e.target.value})}  placeholder="Повторите пароль*"/>
            </div>

        <div className={classes["button"]}>
            <button type="submit" onClick={register} className={classes["enter-button"]}>Зарегестрироваться</button>
        </div>
        </div>
    );
}

export default RegistrationForm;
