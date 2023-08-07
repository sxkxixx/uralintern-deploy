import React from 'react';
import classes from '../css/RangeInput.module.css'

function RangeInput({value, id, onChange}) {
    function handleInputChange(e) {
        let target = e.target;
        const min = target.min;
        const max = target.max;
        const val = target.value;
        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
        onChange(id, Number(target.value));
      }
    
    return (
        <div>
        <input
        key={id}

         className={classes["input"]} value={value} type="range"
         step={0.1} min={-1} max={3}
         style={{backgroundSize:`${(value + 1) * 100 / (4)}% 100%`}}
         onChange={(e) => handleInputChange(e)} />
        <output className={classes["output"]}  id="rangevalue">{value}</output>
    </div>
    )
}

export default RangeInput;