import Multiselect from 'multiselect-react-dropdown';
import React from 'react';

function SelectCriteria({criteria, selectedCriteria, onRemove, onSelect}) {
    return (
        <Multiselect
            avoidHighlightFirstOption={true}
            options={criteria}
            selectedValues={selectedCriteria}
            onSelect={onSelect}
            onRemove={onRemove}

            emptyRecordMsg="Подходящих критериев не найдено"

            style={{
                chips:{ 
                }
                ,
                multiselectContainer: {
                    color: "black",
                },
                searchBox: {
                background: "#FDFDFF",
                borderRadius: "10px",
                maxWidth: "400px",
                minHeight: "100px",
                }
            }}
            displayValue="title"
        />
    );
}

export default SelectCriteria;