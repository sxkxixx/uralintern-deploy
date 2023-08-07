import React, { useState } from 'react';
import { useChangeRoleMutation, useGetListRolesQuery } from '../../../redux/authApi';
import { useSelector } from 'react-redux';
import classes from "../css/Team.module.css"

function Role({idRole,idTeam, idIntern}) {
    const {user} = useSelector(state => state.auth);
    const [selectRole, setSelectRole] = useState(idRole);
    const roles = useGetListRolesQuery();
    const [isChange, setIsChange] = useState(false);
    const [changeRole, isLoading] = useChangeRoleMutation();

    const handlRole = async ()=>{
        //console.log({id_intern:idIntern, id_team:idTeam, role:selectRole});

        const res = await changeRole({body:{id_intern:idIntern, id_team:idTeam, role:selectRole}});
        setIsChange(false);
        //console.log(res);
    }


    if (roles.isLoading){
        return (        <p>{"нет роли"}
        {user.user_id === idIntern && <img className={classes["pen-pic"]}
            src={require('../../../images/pen.svg').default}
            width="16" height="16" alt="123"
        />}
    </p>)
    }

    const getRole = () =>{
        return roles.data.find(v => v.id === idRole).title;
    }

    if (isChange){
        return (
    <p>
        <select name="select" className={classes["select-role"]} defaultValue={idRole} onChange={(e) => setSelectRole(e.target.value)}>
            {roles.data.map(role =>
             <option
                className={classes["opt"]}
                value={role.id}
                key={role.id}
            >
                {role.title}
            </option>)}
        </select>
        
        <div className={classes["Y-pic"]} onClick={() => handlRole()}>
            <img 
             src={require('../../../images/Y.svg').default} 
            width="16" height="16" alt="123"
            />
        </div>

        <div className={classes["X-pic"]} onClick={() => setIsChange(false)}>
            <img 
             src={require('../../../images/X.svg').default} 
            width="16" height="16" alt="123"
            />
        </div>
    </p>)
    }

    return (
        <p>{getRole()}

        {user.user_id === idIntern &&(
        <div className={classes["pen-pic"]} onClick={() => setIsChange(true)}>
            <img 
             src={require('../../../images/pen.svg').default} 
            width="16" height="16" alt="123"
            />
        </div>)}
    </p>
    );
}

export default Role;