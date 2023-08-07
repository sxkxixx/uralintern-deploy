import React from 'react';
import classes from '../css/Navigation.module.css'
import { NavLink } from 'react-router-dom';


function NavigationRole({items, mainTitle, link}) {
    return (
        <div className={classes["roles"]}>
        <div className={`${classes["name-role"]}`}>{mainTitle}</div>
        <ul>
            {items.length > 0? items.map((team) => <li  key={team.id}>
                <NavLink className={classes["roles-li-p"]} to={`${link}/${team.id}`}>{team.title}
                </NavLink>
                </li>) : <li>список пуст</li>}
        </ul>
    </div>
    );
}

export default NavigationRole;