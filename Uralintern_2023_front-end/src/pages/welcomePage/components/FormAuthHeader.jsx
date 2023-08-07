import classes from "../css/Form.module.css";
import React from "react";

const FormAuthHeader = ({onChange, form}) => {
    return (
        <>
            <div className={`${classes["enter"]} ${form === 1 && classes["selected"]}`} onClick={() => onChange(1)}>Вход</div>
            <div className={`${classes["registr"]} ${form === 2 && classes["selected"]}`} onClick={() => onChange(2)}>Регистрация</div>
        </>
    );
}

export default FormAuthHeader;
