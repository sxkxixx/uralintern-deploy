import React from 'react';
import classes from "../css/Team.module.css"
import { domen, useGetListRolesQuery, useGetUserInfoQuery, useGetUserQuery } from '../../../redux/authApi';
import { useSelector } from 'react-redux';
import Role from './Role';
import { Link } from 'react-router-dom';

function Intern({intern}) {
    
    const internName = useGetUserQuery({id:intern.id_intern});
    const internInfo = useGetUserInfoQuery({id:intern.id_intern});
    

    if(internName.isLoading || internInfo.isLoading){
        return <div></div>
    }

    return (
        <li key={intern.id} className={classes['command-info-person']}>
        <div className={classes["photo"]}>
            <Link to={`/user/${intern.id_intern}`}>
                <img
                style={{borderRadius:"10px"}}
                src={ internName.data.image
                    ? domen+ internName.data.image
                    : require("../../../images/profile.svg").default
                }
                width="97" height="110"
                alt="123"
            /></Link>

        </div>
        <div className={`${classes["text"]} ${classes["fio"]}`}>
            а
            <Role idIntern={intern.id_intern} idTeam={intern.id_team} idRole={intern.role}/>
        </div>                            
        <div className={`${classes["text"]} ${classes["contacts"]}`}>
        {internInfo.data.vk ??"нет данных"}
            <p>{internInfo.data.telegram ??"нет данных"}</p>
        </div>
        <div className={`${classes["text"]} ${classes["education"]}`}>
        {internInfo.data.educational_institution ??"нет данных"}
            <p>{internInfo.data.specialization ??"нет данных"}</p>
            <p>{internInfo.data.course ??"нет данных"}</p>
        </div>   
</li>
    );
}

export default Intern;