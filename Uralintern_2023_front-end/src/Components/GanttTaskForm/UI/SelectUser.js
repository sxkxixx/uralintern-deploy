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

const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`;

const SelectItem = styled.div`
  //position: relative;
  width: 184px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 32px;
  border: 1px solid #AFBAC3;
  background: #FFFFFF;
  color: black;
  border-radius: 5px;
  padding: 0 8px;
  font-size: 14px;
  text-overflow: ellipsis;
`;

const SelectUser = ({label}) => {
    const {userId} = useParams();
    const user = useGetUserQuery({id:userId});
    return (
        <Wrapper>
            {label && <Label>{label}</Label>}
            <SelectItem>
                {user?.data?.last_name} {user?.data?.first_name}
            </SelectItem>
        </Wrapper>
    );
};

export default SelectUser;
