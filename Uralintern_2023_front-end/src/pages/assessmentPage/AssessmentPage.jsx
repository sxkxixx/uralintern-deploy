import React, { useEffect, useState } from 'react';
import classes from './css/AssesmentPage.module.css'
import Criterion from './components/Criterion';
import { useParams } from 'react-router-dom';
import { useEstimateMutation, useLazyGetEstimationForFormQuery, useLazyGetProjectQuery, useLazyGetStagesQuery, useLazyGetTeamQuery, useLazyGetUserQuery } from '../../redux/authApi';
import { useSelector } from 'react-redux';
import alertify from 'alertifyjs';
import CriterionDescription from "./components/CriterionDestription";


function AssessmentPage({ setModalIsOpen }) {
    const {teamId} = useParams();
    const {user_id:appraiserId} = useSelector((state) => state.auth.user);
    const [getUser] = useLazyGetUserQuery();
    const [getStages] = useLazyGetStagesQuery();
    const [getTeam] = useLazyGetTeamQuery();
    const [getEstimation]= useLazyGetEstimationForFormQuery();
    const [getProject] = useLazyGetProjectQuery();
    const [estimate] = useEstimateMutation();
    const [estimations, setEstimations] = useState(null);
    const [team, setTeam] = useState(null);
    const [stages, setStages] = useState(null);
    const [currentStage, setCurrentStage] = useState(null);
    const [currentEstimation, setCurrentEstimation] = useState({});
    const [project, setProject] = useState();
    const [names, setNames] = useState({});
    const [descriptionIsOpened, setDescriptionIsOpened] = useState(false);
    const [descriptionTitle, setDescriptionTitle] = useState(null);
    const [descriptionText, setDescriptionText] = useState(null);
    const sendEstimation = async () => {
        for (let est in currentEstimation){
            await estimate({body: currentEstimation[est]});
        }
        alertify.notify("оценка успешно отправлена", "success");

    };
    const swapStage = (id) =>{

        //console.log(estimations[id]);
        const key = Object.keys(currentEstimation)[0];
        setCurrentEstimation({...estimations[id][currentEstimation[key].id_intern]})
        setCurrentStage({...stages.find(stage => stage.id === id)})
    };
    const swapAssessedPerson = (id) =>{
        setCurrentEstimation({...estimations[currentStage.id][id]})
    }

    const closeCriteriaDescription = (evt) => {
        if (evt.key === 'Escape') {
            console.log('jopa')
            setDescriptionIsOpened(false);
            setModalIsOpen(false);
        }
    }


    useEffect(() =>{
        async function getEstimations(){
            const tm = await getTeam({id:teamId}, true);
            const st = await getStages({id:teamId}, true);
            const proj = await getProject({id:tm.data.id_project});
            const result = {};
            const nms = {};
            for(let stage of st.data){
                result[stage.id] = {};
                for(let intern of tm.data.interns){
                    if(!(intern.id_intern in nms)){
                        const r = await getUser({id:intern.id_intern}, true);
                        nms[intern.id_intern] = `${r.data.last_name} ${r.data.first_name} ${r.data?.patronymic ?? ""}`;
                    }

                    await getEstimation({appraiserId, internId: intern.id_intern, stageId:stage.id}, true)
                    .unwrap()
                    .then(res => {
                        const value = {};
                        for (let estm of res){
                            value[estm.id_evaluation_criteria]= {
                                    id_intern: intern.id_intern,
                                    id_stage: stage.id,
                                    id_project: tm.data.id_project,
                                    id_team:teamId,
                                    estimation: estm.estimation,
                                    id_evaluation_criteria:estm.id_evaluation_criteria,

                                 }
                        }
                        result[stage.id][intern.id_intern] = value;
                    })
                    .catch(e => {result[stage.id][intern.id_intern] = {}})
                    .finally(() =>{
                        for(let criterion of stage.evaluation_criteria){

                            if(!(criterion.id in result[stage.id][intern.id_intern])){
                                result[stage.id][intern.id_intern][criterion.id] = {
                                    id_intern: intern.id_intern,
                                    id_stage: stage.id,
                                    id_project: tm.data.id_project,
                                    id_team:teamId,
                                    estimation: -1,
                                    id_evaluation_criteria:criterion.id,
                                }
                            }
                        }
                    })
                }
            }
            setNames(nms);
            setProject(proj.data);
            setEstimations({...result});
            setTeam(tm.data);
            setStages(st.data);
            if (st.data.length === 0){
                return;
            }
            setCurrentStage({...st.data[0]})
            setCurrentEstimation({...result[st.data[0].id][tm.data.interns[0].id_intern]})
        }
        getEstimations();
        document.addEventListener('keydown', closeCriteriaDescription);
        return () => document.removeEventListener('keydown', closeCriteriaDescription);
    },[teamId])

    if(!stages || !team || !estimations ){
        return<div></div>;
    }
    if (stages.length===0){
        return <h1>в этой команде нет этапов для оценки</h1>
    }
    if (team.interns.length === 0){
        return <h1>в этой команде нет участников</h1>
    }

    return (
        <div className={classes["forms"]}>
            <h2>Оценка по этапам</h2>
            <p className={classes["info"] + " " + classes["command"]}>Проект: <span>{project.title}</span></p>
            <p className={classes["info"] + " " + classes["command"]}>Команда: <span>{team.title}</span></p>
            <p className={classes["info"] + " " + classes["command"]}>Окончание оценки этапа: <span>{currentStage.end_estimation_date}</span></p>
            <form className={classes['mark-form']} onSubmit={(e) => {e.preventDefault(); sendEstimation()}}>
                <label >
                    <span className={classes["choosing"]}>Выберите этап:</span>
                    <select className={classes["form-selector"]}
                     defaultValue={currentStage.id}
                      name="form-selector"
                      onChange={e => swapStage(Number(e.target.value))}
                      >
                        {stages.map(stage => <option value={stage.id}>{stage.title}</option> )}
                    </select>
                </label>
                <br/>
                <label >
                    <span className={classes["choosing"]}>Выберите стажёра:</span>
                    <select
                        onChange={e => swapAssessedPerson(Number(e.target.value))}
                        className={classes["form-selector"]}
                        name="form-selector"
                        defaultValue={currentEstimation.id_intern}>
                        {team.interns.map(intern =>
                        <option value={intern.id_intern}>
                            {names[intern.id_intern]}
                        </option> )}

                    </select>
                </label>

                {currentStage.evaluation_criteria.map(criterion =>
                    <Criterion
                        nameCriterion={criterion.title}
                        onChange={(id, value) => {
                            currentEstimation[id].estimation = value
                            setCurrentEstimation({...currentEstimation});
                        }}
                        id={criterion.id}
                        value={currentEstimation[criterion.id]?.estimation}
                        description={criterion.description}
                        questionOnClick={(title, description) => {
                            setDescriptionIsOpened(true);
                            setDescriptionTitle(title);
                            setDescriptionText(description)
                            setModalIsOpen(true);
                        }}
                    />)}


                <input type="submit" className={classes['give-a-mark']} value="Оценить"/>
            </form>
            <CriterionDescription title={descriptionTitle} description={descriptionText} isOpened={descriptionIsOpened}/>
        </div>
    );
}

export default AssessmentPage;
