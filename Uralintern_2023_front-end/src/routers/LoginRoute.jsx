import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

function LoginRoute({children}) {
    const {user} = useSelector((state) => state.auth);

    if (user){
        return <Navigate to={`/user/${user.user_id}`}/>
    }

    return (
        children
    );
}

export default LoginRoute;