import React, {useEffect} from 'react';
import s from './Modal.module.css'
import {ReactComponent as Close} from '../../../assets/img/closeModal.svg'
import CreateForm from "../CreateForm/CreateForm";
import EditForm from "../EditForm/EditForm";
import ViewForm from "../ViewForm/ViewForm";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {taskIdState, tasksState} from "../../../store/atom";
import {getIdTask} from "../../../services/task";

const Modal = ({id, parentId, parentName , showModal, setShowModal, formType, setFormType, typeTask}) => {
    const closeForm = () =>{
        setFormType('')
        setShowModal(false)
    }

    return (
        <>
            {showModal ? (
                <div className={s.container} onClick={() => setShowModal(false)}>
                    <div className={s.modal} onClick={e => e.stopPropagation()}>
                        <button className={s.close} onClick={closeForm}><Close/></button>
                        {formType === 'create' && (<CreateForm typeTask={typeTask} formType={formType} setShowModal={setShowModal} parentName={parentName} parentId={parentId}/>)}
                        {formType === 'edit' && (<EditForm typeTask={typeTask} setShowModal={setShowModal} setFormType={setFormType} parentName={parentName} id={id}/>)}
                        {formType === 'view' && (<ViewForm typeTask={typeTask} setShowModal={setShowModal}  setFormType={setFormType} parentName={parentName} id={id}/>)}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Modal;
