import classes from "../css/Form.module.css";
import React from "react";

const ResetFormSucceed = () => {
    return (
        <>
            <hr/>
            <p className={classes['reset-description']}>Письмо было успешно отправлено на почту!
                Следуйте инструкции в письме для восстановления пароля.</p>
            <img className={classes['wing']} src={require("../../../images/wing.svg").default} alt="Письмо отправлено на почту" width={175} height={175}/>
        </>
)
}

export default ResetFormSucceed;
