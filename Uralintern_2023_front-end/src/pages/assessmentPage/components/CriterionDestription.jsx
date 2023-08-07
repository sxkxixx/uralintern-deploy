import classes from "../css/AssesmentPage.module.css";
import React from "react";

const CriterionDescription = ({title, description, isOpened}) => {
    const openedClass = isOpened ? classes['is-opened'] : '';
    return (
        <div className={`${classes['criteria-description']} ${openedClass}`}>
            <div className={classes['criteria-description-header']}>
                <h3>{title}</h3>
            </div>
            <div className={classes['wrapper']}>
                <div>
                    <h4>Описание</h4>
                    <p>{description}</p>
                </div>
            </div>
        </div>)
}

export default CriterionDescription;
