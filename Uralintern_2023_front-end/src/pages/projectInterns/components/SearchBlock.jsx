import React, { useState } from 'react';
import classes from '../css/ProjectInterns.module.css'
import Filter from './Filter';

function filter(roles, team="", internName=""){
    const predicate = (intern) =>{
        return (roles.size === 0 || roles.has(intern.role) ) && intern.name.includes(internName) && intern.teamTitle.includes(team);
    }

}

const selectedRoles = new Set();

function SearchBlock({interns, onSelect, roles }) {

    const [openFilter, setOpenFilter] = useState(false);
    const [internName, setInternName] = useState("")
    const [teamName, setTeam] = useState("")

    const filter = () =>{

        onSelect(interns.filter((intern) =>
                        (selectedRoles.size === 0 || selectedRoles.has(intern.role) )
                        && intern.name.includes(internName)
                        && intern.teamTitle.includes(teamName)))
    }


    return (
        <div className={classes["search"]}>
            {openFilter && <Filter
                roles={roles}
                selectRole={(id) => {
                    selectedRoles.add(id);
                    filter();
                }}  
                removeRole={(id) =>{
                    selectedRoles.delete(id)
                    filter();
                }}
                teamName={teamName}
                setTeamName={setTeam}

                findTeam={filter}
            />}
            <div className={classes["search-trainee"]}>
                <input type="text" value={internName} onChange={(e) => setInternName(e.target.value) } placeholder="Искать стажёра..."/>
                <img style={{cursor:"pointer"}} src={require("../../../images/find.svg").default} onClick={filter} width="12.65" height="12.65" alt="поиск"/>
            </div>
            <div className={classes["filter-sort"]} onClick={() => setOpenFilter(!openFilter)}>
                <img src={require("../../../images/filter.svg").default}  width="13.33" height="13.33" alt="фильтр"/>
            </div>
            {/* <div className={classes["filter-sort"]}>
                <img src={require("../../../images/sort.svg").default} width="13.34" height="13.34" alt="фильтр"/>
            </div> */}
        </div>
    );
}

export default SearchBlock;