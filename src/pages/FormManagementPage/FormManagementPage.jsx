import SectionedLayout from '../../layouts/SectionedLayout/SectionedLayout';
import Icon from '../../components/Icon/Icon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import FormQuestion from '../../components/form/FormQuestion/FormQuestion';
import { Button } from '../../components/inputs/Button/Button';
import FileInput from '../../components/inputs/FileInput/FileInput';
import TextField from '../../components/inputs/TextField/TextField';

import styles from './FormManagementPage.module.css';
import { produce } from "immer";

const FormManagementPage = () => {
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
        function moveBetweenPaths(path, fromPath, fromIndex, toPath, toIndex){
            setQuestions(prev =>
                produce(prev, draft => {
                    let fromList = draft;
                    let toList = draft;
                    fromPath = [...path, ...fromPath]
                    toPath = [...path, ...toPath]
    
                    console.log('fromPath: ', fromPath, 'toPath: ', toPath);
                    console.log('fromIndex: ', fromIndex, 'toIndex: ', toIndex);
    
                    // Navigate to source list
                    for(let i = 0; i < fromPath.length; i++){
                        fromList = fromList[fromPath[i]];
                    }
    
                    // Navigate to destination list
                    for(let i = 0; i < toPath.length; i++){
                        toList = toList[toPath[i]];
                    }
    
                    console.log('fromList: ', Array.isArray(fromList), 'toList: ', Array.isArray(toList));
                    // Validate
                    if(!Array.isArray(fromList)) return;
                    if(!Array.isArray(toList)) return;
    
                    if(
                        fromIndex < 0 ||
                        fromIndex >= fromList.length
                    ) return;
    
                    if(
                        toIndex < 0 ||
                        toIndex >= toList.length
                    ) return;
    
                    // Remove item from source
                    const [item] = fromList.splice(fromIndex, 1);
    
                    // Insert into destination
                    toList.splice(toIndex, 0, item);
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
			
			case 'move':
				moveBetweenPaths(path, ...args);
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
                                    max_pages={questions.length}
                                    {..._}
                                    path={[...path, i]}
                                    actionByPath={actionByPath}
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
