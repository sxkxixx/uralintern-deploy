import React from 'react';
import classes from "../css/Navigation.module.css"
import { useGetMyTeamsQuery } from '../redux/authApi';
import NavigationRole from './NavigationRole';
import { useSelector } from 'react-redux';
function Navigation({open, modalIsOpen}) {

    const team = useGetMyTeamsQuery();
    const {user} = useSelector(state => state.auth);
    if(team.isLoading || team.error){
        return <div style={{display:"none"}}></div>
    }
    return (
        <div className={`${classes["navigation"]} ${open && classes["active"]} ${modalIsOpen ? '' : classes['modal-is-open']}`}>
        {(user.groups.find(role => role === "руководитель") || team.data.director.length > 0) && <NavigationRole items={team.data.director} mainTitle={"Проекты"} link={"project"} />}

        {(user.groups.find(role => role === "куратор") || team.data.tutor.length > 0) && <NavigationRole items={team.data.tutor} mainTitle={"Кураторство"} link={"team"} />}

        {(user.groups.find(role => role === "стажёр") || team.data.intern.length > 0)  && <NavigationRole items={team.data.intern} mainTitle={"Команды"} link={"team"} />}
        </div>
    );
}

export default Navigation;
