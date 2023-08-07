import React from 'react';
import styled from 'styled-components';
import shape from "../../../assets/img/shape.svg"
import {useRecoilValue} from "recoil";
import {projectInterns} from "../../../store/atom";
import {useParams} from "react-router-dom";
import {useGetUserQuery} from "../../../redux/authApi";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

// const IconWrapper = styled.div`
//   position: absolute;
// `;

const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`;

const SelectItem = styled.select`
  //position: relative;
  width: 184px;
  height: 32px;
  border: 1px solid #AFBAC3;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 0 8px;
  font-size: 14px;
  text-overflow: ellipsis;
`;

const Option = styled.option`
  font-size: 1rem;
`;

const Select = ({label, defaultValue, options, value, onChange, disabled = false, perf, dis}) => {
    const internsList = useRecoilValue(projectInterns)
    const {userId} = useParams();
    const user = useGetUserQuery({id: userId});
    return (
        <Wrapper>
            {label && <Label>{label}</Label>}
            {options === internsList.interns && !perf && value !== user?
                <SelectItem value={value} defaultValue={defaultValue} onChange={onChange} disabled={disabled}>
                    <option selected disabled>{dis}</option>
                    {options.map((option) => (
                        <Option key={option.id_intern} value={option.id_intern}>
                            {option.last_name} {option.first_name}
                        </Option>
                    ))}
                </SelectItem>
                :
                options === internsList.interns && perf ?
                    <SelectItem value={value} disabled={disabled}>
                        {/*<option selected disabled>{dis}</option>*/}
                        {options.map((option) => (
                            <Option key={option.id} value={perf}>
                                {option.last_name} {option.first_name}
                            </Option>
                        ))}
                    </SelectItem>
                    :
                    value === user ?
                        <SelectItem value={user.id} defaultValue={defaultValue} onChange={onChange} disabled={disabled}>
                            {options.map((option) => (
                                <Option key={option.id}>
                                    {option.last_name} {option.first_name}
                                </Option>
                            ))}
                        </SelectItem>
                        :
                        <SelectItem value={value} defaultValue={defaultValue} onChange={onChange} disabled={disabled}>
                            {options.map((option) => (
                                <Option key={option.id} value={option.id}>
                                    {option.title}
                                </Option>
                            ))}
                        </SelectItem>
            }
        </Wrapper>
    );
};

export default Select;
