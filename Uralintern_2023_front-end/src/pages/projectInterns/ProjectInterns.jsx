import React, { useEffect, useState } from 'react';
import classes from './css/ProjectInterns.module.css'
import { useLazyGetListRolesQuery, useLazyGetTeamsInProjectQuery, useLazyGetUserQuery } from '../../redux/authApi';
import { useParams } from 'react-router-dom';
import SearchBlock from './components/SearchBlock';
import ListInternProj from './components/ListInternProj';



function ChangeRoles(roles){
    const result = {};
    for(let role of roles){
        result[role.id] = role.title;
    }
    return result
}


function ProjectInterns() {
    
    const {projectId} = useParams();
    const [roles, setRoles] = useState()
    const [triggerTeams] = useLazyGetTeamsInProjectQuery();
    const [triggerRoles] = useLazyGetListRolesQuery();
    const [triggerUser] = useLazyGetUserQuery();
    const [selectedInterns, setSelectedInterns] = useState();
    const [interns, setInterns] = useState();

    useEffect(() =>{
        async function getTeams(){
            const res = await triggerTeams({id:projectId}, true);
            const rolesRes = await triggerRoles(undefined, true);
            const dictRoles = ChangeRoles(rolesRes.data);


            const result = [];
            for(let team of res.data){
                for(let intern of team.interns){
                    const internName = await triggerUser({id:intern.id_intern}, true);

                    result.push({...intern,
                        "roleTitle": dictRoles[intern.role],
                        "teamTitle": team.title,
                        "name": `${internName.data.last_name} ${internName.data.first_name} ${internName.data?.patronymic ?? ""}`,
                        "image": internName.data.image
                        })

                }
            }
            setSelectedInterns([...result])
            setInterns([...result]);
            setRoles([...rolesRes.data])

            //console.log(result);
        }
        getTeams()
    },[projectId, triggerRoles, triggerTeams])

    if (!roles|| !interns || !selectedInterns){
        return <div></div>
    }


    return (
        <div style={{display:"flex"}}>
    <div className={classes["search-main"]}>
        <h2>Статистика моих стажёров</h2>
        <SearchBlock interns={interns} selectedInterns={selectedInterns} onSelect={setSelectedInterns} roles={roles}/>
        <ListInternProj interns={selectedInterns}/>

    </div>
    </div>
    );
}

export default ProjectInterns;