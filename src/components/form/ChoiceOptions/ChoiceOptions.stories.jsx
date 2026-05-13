import { useState } from "react";
import { produce } from "immer";
import ChoiceOptions from "./ChoiceOptions";

/**
 * Storybook configuration for the `choiceoptions` component.
 * This file defines the stories for the `choiceoptions` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/Form/ChoiceOptions",
    component: ChoiceOptions,
}

/**
 * The only variant of the `ChoiceOptions` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Default = () => {
	let [options, setOptions] = useState([
        'first',
        'second',
        'third',
    ]);

    function appendByPath(path, value){
        setOptions(prev =>
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
    function deleteByPath(path){
        setOptions(prev =>
            produce(prev, draft => {

                let current = draft;

                for(let i = 0; i < path.length - 1; i++){
                    current = current[path[i]];
                }

                const key = path[path.length - 1];

                if(Array.isArray(current)){
                    current.splice(key, 1);
                }
                else{
                    delete current[key];
                }
            })
        );
    }
    let staticPathToHere = [];

	return (
		<ChoiceOptions
			options={options}
			deleteByPath={(path) => deleteByPath([...staticPathToHere, ...path])}
            appendByPath={(path, value) => appendByPath([...staticPathToHere, ...path], value)}
		/>
	);
}