import React from 'react';
import Multiselect from 'multiselect-react-dropdown';




function SelectInterns({interns, selectedValues , onSelect, onRemove}) {

    return (
        <Multiselect
        avoidHighlightFirstOption={true}
        options={interns}
        selectedValues={selectedValues}
        onSelect={onSelect}
        onRemove={onRemove}

        emptyRecordMsg="Подходящих стажёров не найдено"

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
        displayValue="name"
        selectedValueDecorator={v => v.split(" ")[0]}

        />
    );
}

// {
//     multiselectContainer: { // To change css for multiselect (Width,height,etc..)
//       ....
//     },
//     searchBox: { // To change search box element look
//       border: none;
//       font-size: 10px;
//       min-height: 50px;
//     },
//     inputField: { // To change input field position or margin
//         margin: 5px;
//     },
//     chips: { // To change css chips(Selected options)
//       background: red;
//     },
//     optionContainer: { // To change css for option container 
//       border: 2px solid;
//     }
//     option: { // To change css for dropdown options
//       color: blue;
//     },
//     groupHeading: { // To chanage group heading style
//       ....
//     }
//   }




export default SelectInterns;