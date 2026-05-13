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
 * The only variant of the `FormQuestion` component.
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
