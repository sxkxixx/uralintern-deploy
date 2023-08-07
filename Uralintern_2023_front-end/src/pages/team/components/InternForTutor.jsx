import React, { useState } from 'react';
import classes from '../css/TeamForTutor.module.css'
import StatisticsTable from './StatisticsTable';
import { domen, useGetFormForTeamQuery, useGetUserInfoQuery, useGetUserQuery } from '../../../redux/authApi';
import Role from './Role';
import { Link, useNavigate } from 'react-router-dom';


function InternForTutor({intern}) {
    const internName = useGetUserQuery({id:intern.id_intern});
    const internInfo = useGetUserInfoQuery({id:intern.id_intern});
    const form = useGetFormForTeamQuery({user_id:intern.id_intern, team_id:intern.id_team});
    const [open, setOpen] = useState();
    const navigate = useNavigate();
    if (internName.isLoading || internInfo.isLoading || form.isLoading){
        return <div></div>
    }

    return (
    <div>
        <li className={classes['command-info-person']}>
            <div className={classes["photo"]}>
                <Link to={`/user/${intern.id_intern}`}>
                    <img
                        style={{borderRadius:"10px"}}
                        src={ internName.data.image
                            ? domen + internName.data.image
                            : require("../../../images/profile.svg").default
                        } width="40" height="44" alt="123"/>
                </Link>
            </div>
            <div className={`${classes["text"]} ${classes["fio"]}`}>
                { `${internName.data.last_name} ${internName.data.first_name} ${internName.data?.patronymic ?? ""}`}
                <Role idIntern={intern.id_intern} idTeam={intern.id_team} idRole={intern.role}/>
            </div>
            
                <div className= {`${classes["text"]} ${classes["contacts"]}`}>{internInfo.data.vk ??"нет данных"}
                <p>{internInfo.data.telegram ??"нет данных"}</p></div>
            
                <div className={`${classes["text"]} ${classes["education"]}`}>
                    {form.isError ? "...": `${form.data?.estimated} из ${form.data?.total}`}
                </div>   
            <div className={`${classes["text"]} ${classes["forms"]}`} onClick={() => setOpen(!open)} >Просмотреть</div>  
            <div className={`${classes["text"]} ${classes["table"]}`} onClick={() => navigate(`/report/${intern.id_intern}/${intern.id_team}`)}>
                Перейти<img src={require("../../../images/link-img.svg").default}  width="18" height="18" alt="123"/>
            </div> 
        </li>
        <StatisticsTable open={open} userId={intern.id_intern} teamId={intern.id_team}/>
    </div>
    );
}

export default InternForTutor;