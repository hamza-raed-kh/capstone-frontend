import SectionedLayout from '../../../layouts/SectionedLayout/SectionedLayout';
import Icon from '../../../components/ui/Icon/Icon';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentCompetition, clearCurrentCompetition } from '../../../features/competition/competitionSlice';
import SearchBar from '../../../components/ui/SearchBar/SearchBar';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import FormQuestion from '../../../components/form/FormQuestion/FormQuestion';
import { Button } from '../../../components/inputs/Button/Button';
import FileInput from '../../../components/inputs/FileInput/FileInput';
import TextField from '../../../components/inputs/TextField/TextField';

import styles from './FormManagementPage.module.css';
import { produce } from "immer";

const FormManagementPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        if (id) dispatch(setCurrentCompetition(Number(id)))
        return () => dispatch(clearCurrentCompetition())
    }, [id, dispatch])

    // questions, comp_name, teams=true, path=[], actionByPath, onDiscard, onSave
	const [questions, setQuestions] = useState([
		{
			required: true,
			type: undefined,
			question: '',
			rules: {
				word_limit: {
					active: true,
					num: 200,
				},
				num_min: {
					active: true,
					num: 1,
				},
				num_max: {
					active: true,
					num: 10,
				},
				num_step: {
					active: true,
					num: 1,
				},
				choice_min: {
					active: true,
					num: 1,
				},
				choice_max: {
					active: true,
					num: 1,
				},
			},
			options: [
				'First choice',
			],
		},
		{
			required: true,
			type: undefined,
			question: '',
			rules: {
				word_limit: {
					active: true,
					num: 200,
				},
				num_min: {
					active: true,
					num: 1,
				},
				num_max: {
					active: true,
					num: 10,
				},
				num_step: {
					active: true,
					num: 1,
				},
				choice_min: {
					active: true,
					num: 1,
				},
				choice_max: {
					active: true,
					num: 1,
				},
			},
			options: [
				'First choice',
			],
		},
		{
			required: true,
			type: undefined,
			question: '',
			rules: {
				word_limit: {
					active: true,
					num: 200,
				},
				num_min: {
					active: true,
					num: 1,
				},
				num_max: {
					active: true,
					num: 10,
				},
				num_step: {
					active: true,
					num: 1,
				},
				choice_min: {
					active: true,
					num: 1,
				},
				choice_max: {
                    active: true,
					num: 1,
				},
			},
			options: [
				'First choice',
			],
		},
	]);
    
    let comp_name = "Web3 Hackathon"
    let teams = true
    let path = []
    let onDiscard = () => {};
    let onSave = () => {};

	const moving = useRef(false);
	function moveQuestion(fromIndex, toIndex) {
		if (fromIndex === toIndex) return;
		if (moving.current) return;
		moving.current = true;
		setTimeout(() => { moving.current = false; }, 150);
		setQuestions(prev => produce(prev, draft => {
			if (fromIndex < 0 || fromIndex >= draft.length) return;
			if (toIndex < 0 || toIndex >= draft.length) return;
			const [item] = draft.splice(fromIndex, 1);
			draft.splice(toIndex, 0, item);
		}));
	}

	function actionByPath(path, action, ...args) {
        function updateByPath(path, value){
            setQuestions(prev =>
                produce(prev, draft => {
                    let current = draft;
                    
                    for(let i = 0; i < path.length - 1; i++){
                        current = current[path[i]];
                    }
                    current[path[path.length - 1]] = value;
                })
            );
        }
        function toggleByPath(path){
            setQuestions(prev =>
                produce(prev, draft => {
                    let current = draft;
                    for(let i = 0; i < path.length - 1; i++){
                        current = current[path[i]];
                    }
    
                    const key = path[path.length - 1];
                    current[key] = !current[key];
                })
            );
            // console.log('Question: ', questions);
        }
        function deleteByPath(path){
            setQuestions(prev =>
                produce(prev, draft => {
                    console.log('Path: ', path);
                    
                    let current = draft;
                    for(let i = 0; i < path.length - 1; i++){
                        current = current[path[i]];
                    }
    
                    const key = path[path.length - 1];
    
                    if(Array.isArray(current)){
                        current.splice(key, 1);
                    } else {
                        delete current[key];
                    }
                })
            );
        }
        function appendByPath(path, value){
            setQuestions(prev =>
                produce(prev, draft => {
                    let current = draft;
                    for(let i = 0; i < path.length; i++){
                        current = current[path[i]];
                    }
    
                    if(Array.isArray(current)){
                        current.push(value);
                    } else if(typeof current === 'object' && current !== null){
                        Object.assign(current, value);
                    }
                })
            );
        }
		switch (action) {
			case 'update':
				updateByPath(path, ...args);
				break;
			
			case 'toggle':
				toggleByPath(path, ...args);
				break;
			
			case 'delete':
				deleteByPath(path, ...args);
				break;
			
			case 'append':
				appendByPath(path, ...args);
				break;
		}
	}

    return (
        <SectionedLayout preset="organizer">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.formHeader}>
                        <SectionHeader
                            icon={'mdi:form-outline'}
                            title={"Application Form Management"}
                            category={comp_name}
                        />
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.formQuestions}>
                            {teams && <>
                                <FileInput
                                    label="Team Picture"
                                    variant="avatar"
                                    readOnly={true}
                                />
                                <TextField
                                    label="Team Name"
                                    placeholder={'Write name here...'}
                                    onChange={e => setTeamName(e.target.value)}
                                    readOnly={true}
                                />
                            </>}
                            {questions.map((_, i) => 
                                <FormQuestion
                                    key={i}
                                    order={i}
                                    form_length={questions.length}
                                    {..._}
                                    path={[...path, i]}
                                    actionByPath={actionByPath}
                                    moveQuestion={moveQuestion}
                                />
                            )}
                        </div>
                        <div className={styles.formFooterFirst}>
                            <div>
                                <Button
                                    variant="primary"
                                    onClick={() => actionByPath([], 'append', {
                                        required: true,
                                        type: undefined,
                                        question: '',
                                        rules: {
                                            word_limit: {
                                                active: true,
                                                num: 200,
                                            },
                                            num_min: {
                                                active: true,
                                                num: 1,
                                            },
                                            num_max: {
                                                active: true,
                                                num: 10,
                                            },
                                            num_step: {
                                                active: true,
                                                num: 1,
                                            },
                                            choice_min: {
                                                active: true,
                                                num: 1,
                                            },
                                            choice_max: {
                                                active: true,
                                                num: 1,
                                            },
                                        },
                                        options: [
                                            'First choice',
                                        ],
                                    })}
                                >
                                    <div className={styles.choiceAddContent}>
                                        <Icon icon={'material-symbols:add'} size={24}/>
                                        Add Question
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <div className={styles.formFooterSecond}>
                            <div>
                                <Button variant="red" onClick={onDiscard}>Discard</Button>
                            </div>
                            <div>
                                <Button variant="primary" onClick={onSave}>Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionedLayout>
    )
}

export default FormManagementPage
