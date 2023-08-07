import React from 'react';
import classes from '../css/ChangeUser.module.css'
import { useGetUserInfoQuery } from '../../../redux/authApi';
import LineInfo from './LineInfo';


function BlockInfo({info}) {

    return (
        <div>
            <h3 className={classes["education-h"]}>Образование: </h3>
            <div>
                <LineInfo title={"Учебное заведение"} name={"educational_institution"} values={info}/>
                <LineInfo title={"Специальность"} name={"specialization"} values={info}/>
                <LineInfo title={"Курс"} name={"course"} values={info}/>
                <LineInfo title={"Академическая степень"} name={"academic_degree"} values={info}/>
            </div>
            <h3 className={classes["contact-h"]}>Контакты: </h3>
            <div>
            <LineInfo title={"Телефон"} name={"telephone"} values={info}/>
            <LineInfo title={"Ссылка на VK"} name={"vk"} values={info}/>
            <LineInfo title={"Ссылка на Telegram"} name={"telegram"} values={info}/>
            </div>
        </div>
    );
}

export default BlockInfo;