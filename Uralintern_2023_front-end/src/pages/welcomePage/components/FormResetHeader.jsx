import classes from "../css/Form.module.css";
import React from "react";
import {NavLink} from "react-router-dom";

const FormResetHeader = () => {
    return (
        <>
            <div className={classes["reset"]}>Восстановление пароля</div>
        </>
    );
}

export default FormResetHeader;
