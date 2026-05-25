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
import { useGetEventQuery } from '../../../features/api/eventApi';
import {
    useGetTextQuestionsQuery, useCreateTextQuestionMutation, useUpdateTextQuestionMutation, useDeleteTextQuestionMutation,
    useGetNumericQuestionsQuery, useCreateNumericQuestionMutation, useUpdateNumericQuestionMutation, useDeleteNumericQuestionMutation,
    useGetChoiceQuestionsQuery, useCreateChoiceQuestionMutation, useUpdateChoiceQuestionMutation, useDeleteChoiceQuestionMutation,
    useCreateChoiceMutation, useDeleteChoiceMutation
} from '../../../features/api/questionApi';
import { addToast } from '../../../features/toast/toastSlice';

const FormManagementPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        if (id) dispatch(setCurrentCompetition(Number(id)))
        return () => dispatch(clearCurrentCompetition())
    }, [id, dispatch])

    // questions, comp_name, teams=true, path=[], actionByPath, onDiscard, onSave
    const [questions, setQuestions] = useState([]);

    const { data: comp } = useGetEventQuery(Number(id), { skip: !id })
    const { data: textQData, isLoading: textLoading, refetch: refetchText } = useGetTextQuestionsQuery({ event: id }, { skip: !id })
    const { data: numQData, isLoading: numLoading, refetch: refetchNum } = useGetNumericQuestionsQuery({ event: id }, { skip: !id })
    const { data: choiceQData, isLoading: choiceLoading, refetch: refetchChoice } = useGetChoiceQuestionsQuery({ event: id }, { skip: !id })

    const [createText] = useCreateTextQuestionMutation();
    const [updateText] = useUpdateTextQuestionMutation();
    const [deleteText] = useDeleteTextQuestionMutation();
    const [createNum] = useCreateNumericQuestionMutation();
    const [updateNum] = useUpdateNumericQuestionMutation();
    const [deleteNum] = useDeleteNumericQuestionMutation();
    const [createChoice] = useCreateChoiceQuestionMutation();
    const [updateChoice] = useUpdateChoiceQuestionMutation();
    const [deleteChoice] = useDeleteChoiceQuestionMutation();
    const [createChoiceOption] = useCreateChoiceMutation();
    const [deleteChoiceOption] = useDeleteChoiceMutation();

    const loadQuestions = () => {
        if (textLoading || numLoading || choiceLoading) return;
        if (!textQData || !numQData || !choiceQData) return;

        let allQuestions = [];
        const defaultRules = {
            word_limit: { active: true, num: 200 },
            num_min: { active: true, num: 1 },
            num_max: { active: true, num: 10 },
            num_step: { active: true, num: 1 },
            choice_min: { active: true, num: 1 },
            choice_max: { active: true, num: 1 },
        };

        textQData.results.forEach(q => {
            allQuestions.push({
                originalId: q.id, originalType: 'text', position: q.position, type: 'text', question: q.content, required: q.required,
                rules: { ...defaultRules }, options: [], optionsMeta: []
            });
        });
        numQData.results.forEach(q => {
            allQuestions.push({
                originalId: q.id, originalType: 'num', position: q.position, type: 'num', question: q.content, required: q.required,
                rules: {
                    ...defaultRules,
                    num_min: { active: q.min !== null, num: q.min ?? 1 },
                    num_max: { active: q.max !== null, num: q.max ?? 10 },
                    num_step: { active: q.step !== null, num: q.step ?? 1 }
                }, options: [], optionsMeta: []
            });
        });
        choiceQData.results.forEach(q => {
            allQuestions.push({
                originalId: q.id, originalType: 'choice', position: q.position, type: 'choice', question: q.content, required: q.required,
                rules: {
                    ...defaultRules,
                    choice_min: { active: q.min_choices !== null, num: q.min_choices ?? 1 },
                    choice_max: { active: q.max_choices !== null, num: q.max_choices ?? 1 }
                },
                options: q.choices.map(c => c.content),
                optionsMeta: q.choices
            });
        });

        allQuestions.sort((a, b) => a.position - b.position);
        setQuestions(allQuestions);
    };

    useEffect(() => {
        loadQuestions();
    }, [textQData, numQData, choiceQData, textLoading, numLoading, choiceLoading]);

    let comp_name = comp?.title || "Competition Form"
    let teams = comp?.team_size_max > 1
    let path = []

    let onDiscard = () => {
        loadQuestions();
        dispatch(addToast({ message: "Changes discarded", type: "success" }));
    };

    let onSave = async () => {
        try {
            const finalQs = questions.filter(q => q.type && q.question.trim() !== '');

            const toKeepText = new Set(finalQs.filter(q => q.originalType === 'text').map(q => q.originalId));
            const toKeepNum = new Set(finalQs.filter(q => q.originalType === 'num').map(q => q.originalId));
            const toKeepChoice = new Set(finalQs.filter(q => q.originalType === 'choice').map(q => q.originalId));

            for (const q of textQData?.results || []) if (!toKeepText.has(q.id)) await deleteText(q.id).unwrap();
            for (const q of numQData?.results || []) if (!toKeepNum.has(q.id)) await deleteNum(q.id).unwrap();
            for (const q of choiceQData?.results || []) if (!toKeepChoice.has(q.id)) await deleteChoice(q.id).unwrap();

            for (let i = 0; i < finalQs.length; i++) {
                const q = finalQs[i];
                if (q.type === 'text') {
                    const payload = { event: Number(id), content: q.question, required: q.required, position: i };
                    if (q.originalId && q.originalType === 'text') await updateText({ id: q.originalId, ...payload }).unwrap();
                    else await createText(payload).unwrap();
                } else if (q.type === 'num') {
                    const payload = {
                        event: Number(id), content: q.question, required: q.required, position: i,
                        min: q.rules.num_min.active ? q.rules.num_min.num : null,
                        max: q.rules.num_max.active ? q.rules.num_max.num : null,
                        step: q.rules.num_step.active ? q.rules.num_step.num : null,
                    };
                    if (q.originalId && q.originalType === 'num') await updateNum({ id: q.originalId, ...payload }).unwrap();
                    else await createNum(payload).unwrap();
                } else if (q.type === 'choice') {
                    const payload = {
                        event: Number(id), content: q.question, required: q.required, position: i,
                        min_choices: q.rules.choice_min.active ? q.rules.choice_min.num : null,
                        max_choices: q.rules.choice_max.active ? q.rules.choice_max.num : null,
                    };
                    let qId;
                    if (q.originalId && q.originalType === 'choice') {
                        const res = await updateChoice({ id: q.originalId, ...payload }).unwrap();
                        qId = q.originalId;
                    } else {
                        const res = await createChoice(payload).unwrap();
                        qId = res.id;
                    }

                    const oldChoices = q.optionsMeta || [];
                    const newChoiceStrs = q.options || [];
                    const newChoiceStrsSet = new Set(newChoiceStrs);

                    for (const oc of oldChoices) {
                        if (!newChoiceStrsSet.has(oc.content)) {
                            await deleteChoiceOption(oc.id).unwrap();
                        } else {
                            newChoiceStrsSet.delete(oc.content);
                        }
                    }
                    for (const nc of newChoiceStrsSet) {
                        await createChoiceOption({ question: qId, content: nc }).unwrap();
                    }
                }
            }
            dispatch(addToast({ message: "Form saved successfully", type: "success" }));
            refetchText();
            refetchNum();
            refetchChoice();
        } catch (e) {
            console.error("Save form error", e);
            dispatch(addToast({ message: "Failed to save form", type: "error" }));
        }
    };

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
        function updateByPath(path, value) {
            setQuestions(prev =>
                produce(prev, draft => {
                    let current = draft;

                    for (let i = 0; i < path.length - 1; i++) {
                        current = current[path[i]];
                    }
                    current[path[path.length - 1]] = value;
                })
            );
        }
        function toggleByPath(path) {
            setQuestions(prev =>
                produce(prev, draft => {
                    let current = draft;
                    for (let i = 0; i < path.length - 1; i++) {
                        current = current[path[i]];
                    }

                    const key = path[path.length - 1];
                    current[key] = !current[key];
                })
            );
            // console.log('Question: ', questions);
        }
        function deleteByPath(path) {
            setQuestions(prev =>
                produce(prev, draft => {
                    console.log('Path: ', path);

                    let current = draft;
                    for (let i = 0; i < path.length - 1; i++) {
                        current = current[path[i]];
                    }

                    const key = path[path.length - 1];

                    if (Array.isArray(current)) {
                        current.splice(key, 1);
                    } else {
                        delete current[key];
                    }
                })
            );
        }
        function appendByPath(path, value) {
            setQuestions(prev =>
                produce(prev, draft => {
                    let current = draft;
                    for (let i = 0; i < path.length; i++) {
                        current = current[path[i]];
                    }

                    if (Array.isArray(current)) {
                        current.push(value);
                    } else if (typeof current === 'object' && current !== null) {
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
        <div className={styles.pageContainer}>
            <div className={styles.pageSearchSection}>
                <SearchBar variant="placeholder">{comp_name}</SearchBar>
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
                                    <Icon icon={'material-symbols:add'} size={24} />
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
    )
}

export default FormManagementPage
