import { useState } from "react";
import { produce } from "immer";
import FormQuestion from "./FormQuestion";

/**
 * Storybook configuration for the `formquestion` component.
 * This file defines the stories for the `formquestion` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/Form/FormQuestion",
    component: FormQuestion,
}

/**
 * The singular variant of the `FormQuestion` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Default = () => {
	const [question, setQuestion] = useState({
		order: 1,
		required: true,
		type: undefined,
		page: 2,
		question: '',
		max_pages: 7,
		rules: {
			word_limit: {
				active: true,
				num: 200,
			},
			num_min: {
				active: true,
				num: 200,
			},
			num_max: {
				active: true,
				num: 200,
			},
			num_step: {
				active: true,
				num: 200,
			},
			choice_min: {
				active: true,
				num: 200,
			},
			choice_max: {
				active: true,
				num: 200,
			},
		},
		options: [
			'first',
			'second',
			'third',
		],
	});

	function updateByPath(path, value){
		setQuestion(prev =>
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
        setQuestion(prev =>
            produce(prev, draft => {
                let current = draft;
                for(let i = 0; i < path.length - 1; i++){
                    current = current[path[i]];
                }

                const key = path[path.length - 1];
                current[key] = !current[key];
            })
        );
		// console.log('Question: ', question);
    }
	function deleteByPath(path){
        setQuestion(prev =>
            produce(prev, draft => {
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
        setQuestion(prev =>
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
    let staticPathToHere = [];

	return (
		<FormQuestion
			{...question}
			updateByPath={(path, value) => updateByPath([...staticPathToHere, ...path], value)}
			toggleByPath={(path) => toggleByPath([...staticPathToHere, ...path])}
			appendByPath={(path, value) => appendByPath([...staticPathToHere, ...path], value)}
			deleteByPath={(path) => deleteByPath([...staticPathToHere, ...path])}
			onDelete={() => deleteByPath([...staticPathToHere])}
		/>
	);
}

/**
 * The group variant of the `FormQuestion` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Group = () => {
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
					num: 200,
				},
				num_max: {
					active: true,
					num: 200,
				},
				num_step: {
					active: true,
					num: 200,
				},
				choice_min: {
					active: true,
					num: 200,
				},
				choice_max: {
					active: true,
					num: 200,
				},
			},
			options: [
				'first',
				'second',
				'third',
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
					num: 200,
				},
				num_max: {
					active: true,
					num: 200,
				},
				num_step: {
					active: true,
					num: 200,
				},
				choice_min: {
					active: true,
					num: 200,
				},
				choice_max: {
					active: true,
					num: 200,
				},
			},
			options: [
				'first',
				'second',
				'third',
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
					num: 200,
				},
				num_max: {
					active: true,
					num: 200,
				},
				num_step: {
					active: true,
					num: 200,
				},
				choice_min: {
					active: true,
					num: 200,
				},
				choice_max: {
					active: true,
					num: 200,
				},
			},
			options: [
				'first',
				'second',
				'third',
			],
		},
	]);

	function actionByPath(path, action, ...args) {
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
    let staticPathToHere = [];

	return (questions.map((_, i) =>
		<FormQuestion
			key={i}
			order={i}
			max_pages={questions.length}
			{..._}
			path={[...staticPathToHere, i]}
			actionByPath={actionByPath}
		/>
	));
}
