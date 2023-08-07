import React from 'react';
import QuestionMark from './QuestionMark';
import RangeInput from './RangeInput';
import classes from '../css/Criterion.module.css'

function Criterion({nameCriterion, onChange, value, id, description, questionOnClick}) {
    return (
        <div className={`${classes["mark-form-p"]} ${classes["criteria"]}`}>

            <QuestionMark
                onClick={() => questionOnClick(nameCriterion, description)}
                tabIndex={0}

                width="20"
                height="20"
                alt="" />
                {" "}
            {`${nameCriterion}:`}
            <RangeInput id={id} onChange={onChange} value={value}  />
            {/* <RadioButton name={name} value={-1} onChange={onChange} isChecked={isChecked}/>
            <RadioButton name={name} value={0} onChange={onChange} isChecked={isChecked}/>
            <RadioButton name={name} value={1} onChange={onChange} isChecked={isChecked}/>
            <RadioButton name={name} value={2} onChange={onChange} isChecked={isChecked}/>
            <RadioButton name={name} value={3} onChange={onChange} isChecked={isChecked}/> */}
        </div>
    );
}

export default Criterion;
