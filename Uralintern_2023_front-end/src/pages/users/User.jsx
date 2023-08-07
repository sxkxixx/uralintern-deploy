import React from 'react';
import { useParams } from 'react-router-dom';
import classes from "./css/User.module.css"
import { domen, useGetUserInfoQuery, useGetUserQuery } from '../../redux/authApi';

function User(props) {
    const {userId} = useParams();
    const user = useGetUserQuery({id:userId});
    const userInfo = useGetUserInfoQuery({id:userId});
    if(user.isLoading || userInfo.isLoading){
        return <div></div>;
    }
    //console.log("user", user);
    //console.log("userInfo", userInfo);

    return (
        <div className={classes["profile-info"]}>
            <div className={classes["main-profile"]}>
                <h2>Профиль</h2>
                <img className={classes["photo-student"]} src={ user.data.image ? domen + user.data.image  : require("../../images/profile.svg").default} width="135" height="135" alt='123'/>
                <div className={classes["fio-email"]}>
                    <p className={classes["fio"]}>{ `${user.data.last_name} ${user.data.first_name} ${user.data?.patronymic ?? ""}`}</p>
                    <p className={classes["email"]}>{user.data.email}</p>
                </div>
            </div>
            <h3 className={classes["education-h"]}>Образование: </h3>
            <div className={`${classes["education"]} ${classes["grid-container"]}`}>
                <div >Учебное заведение:</div>
                <div className={classes["inf"]}>{userInfo.data.educational_institution ??"нет данных"}</div>
                <div>Специальность:</div>
                <div className={classes["inf"]}>{userInfo.data.specialization ??"нет данных"}</div>
                <div>Курс:</div>
                <div className={classes["inf"]}>{userInfo.data.course ??"нет данных"}</div>
                <div>Академическая степень:</div>
                <div className={classes["inf"]}>{userInfo.data.academic_degree ??"нет данных"}</div>
            </div>
            <h3 className={classes["contact-h"]}>Контакты: </h3>
            <div className={`${classes["contacts"]} ${classes["grid-container"]}`}>
                <div>Телефон:</div>
                <div className={classes["inf"]}>{userInfo.data.telephone ??"нет данных"}</div>
                <div>Ссылка в VK:</div>
                <div className={classes["inf"]}>{userInfo.data.vk ??"нет данных"}</div>
                <div>Ссылка в Telegram:</div>
                <div className={classes["inf"]}>{userInfo.data.telegram ??"нет данных"}</div>
            </div>
        </div>
    );
}

export default User;