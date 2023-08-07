import React from 'react';
import classes from "./css/ChangeUser.module.css"
import { useSelector } from 'react-redux';
import { useGetUserInfoQuery, useGetUserQuery } from '../../redux/authApi';
import BlockInfo from './components/BlockInfo';
import ImageBlock from './components/ImageBlock';
function ChangeUser() {
    const {user} = useSelector(state=> state.auth);
    const mainInfo = useGetUserQuery({id:user.user_id});
    const info = useGetUserInfoQuery({id:user.user_id});

    if (mainInfo.isLoading || info.isLoading){
        return <div></div>
    }

    return (
<div className={classes["profile-info"]}>
            <ImageBlock user={mainInfo.data}/>
            <BlockInfo info={info.data}/>
        </div>
    );
}

export default ChangeUser;