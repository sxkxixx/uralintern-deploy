import React, {useState} from 'react';
import styled from 'styled-components';
import classes from "../../../css/Header.module.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const StyledLi = styled.li`
    border-radius: 8px;
    border: 1px solid #B6BDC3;
    background: #F5F7F9;
    padding: 24px 16px;
    display: flex;
  align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    color: #31393C;
  transition: 0.3s all ease-out;

    &:hover, &:focus {
        border-radius: 8px;
        border: 1px solid #B6BDC3;
        background: #FFF;
        box-shadow: 0px 0px 12px 0px rgba(40, 112, 255, 0.40);
        //cursor: pointer;
    }
`;

const StyledDiv1 = styled.div`
    flex-basis: 30%;
`;

const StyledDiv2 = styled.div`
    flex-basis: 30%;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const StyledDiv3 = styled.div`
    flex-basis: 20%;
`;

const StyledDiv4 = styled.div`
    flex-basis: 20%;
`;


const TableRow = ({project, value, startDate, endDate, key, handleCategoryClick}) => (
    <StyledLi key={key}>
        <StyledDiv1>{project}</StyledDiv1>
        <StyledDiv2>
            <div
                className={classes.gantt}
                onClick={() => handleCategoryClick('kanban', value)}>
                {/*<img*/}
                {/*    src={require("../../../assets/img/KanbanHeader.svg").default}*/}
                {/*    width="16" height="16" alt="Мой профиль"*/}
                {/*/>*/}
                <p>Канбан</p>
            </div>
            <div
                className={classes.gantt}
                onClick={() => handleCategoryClick('gantt', value)}>
                {/*<img*/}
                {/*    src={require("../../../assets/img/GanttHeader.svg.svg").default}*/}
                {/*    width="16" height="16" alt="Мой профиль"*/}
                {/*/>*/}
                <p>Гант</p>
            </div>
        </StyledDiv2>
        <StyledDiv3>{startDate}</StyledDiv3>
        <StyledDiv4>{endDate}</StyledDiv4>
    </StyledLi>
);

export default TableRow;
