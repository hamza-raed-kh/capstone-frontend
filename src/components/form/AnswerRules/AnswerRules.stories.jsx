import { useState } from "react";
import { produce } from "immer";
import AnswerRules from "./AnswerRules";

/**
 * Storybook configuration for the `answerrules` component.
 * This file defines the stories for the `answerrules` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/Form/AnswerRules",
    component: AnswerRules,
}

/**
 * The text variant of the `AnswerRules` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Text = () => {
    let [rules, setRules] = useState({
        word_limit: {
            active: true,
            num: 200,
        },
    });

    function updateByPath(path, value){
        setRules(prev =>
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
        setRules(prev =>
            produce(prev, draft => {

                let current = draft;

                for(let i = 0; i < path.length - 1; i++){
                    current = current[path[i]];
                }

                const key = path[path.length - 1];

                current[key] = !current[key];
            })
        );
    }
    let staticPathToHere = [];

    return (
    <AnswerRules 
        variant={'text'}
        rules={rules}
        updateByPath={(path, value) => updateByPath([...staticPathToHere, ...path], value)}
    toggleByPath={(path) => toggleByPath([...staticPathToHere, ...path])}
    />
  );
};

/**
 * The num variant of the `AnswerRules` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Num = () => {
    let [rules, setRules] = useState({
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
    });
    
    function updateByPath(path, value){
        setRules(prev =>
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
        setRules(prev =>
            produce(prev, draft => {

                let current = draft;

                for(let i = 0; i < path.length - 1; i++){
                    current = current[path[i]];
                }

                const key = path[path.length - 1];

                current[key] = !current[key];
            })
        );
    }
    let staticPathToHere = [];
    
    return (
    <AnswerRules 
        variant={'num'}
        rules={rules}
        updateByPath={(path, value) => updateByPath([...staticPathToHere, ...path], value)}
    toggleByPath={(path) => toggleByPath([...staticPathToHere, ...path])}
    />
  );
};

/**
 * The choice variant of the `AnswerRules` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Choice = () => {
    let [rules, setRules] = useState({
        choice_min: {
            active: true,
            num: 200,
        },
        choice_max: {
            active: true,
            num: 200,
        },
    });
    
    function updateByPath(path, value){
        setRules(prev =>
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
        setRules(prev =>
            produce(prev, draft => {

                let current = draft;

                for(let i = 0; i < path.length - 1; i++){
                    current = current[path[i]];
                }

                const key = path[path.length - 1];

                current[key] = !current[key];
            })
        );
    }
    let staticPathToHere = [];

    return (
    <AnswerRules 
        variant={'choice'}
        rules={rules}
        updateByPath={(path, value) => updateByPath([...staticPathToHere, ...path], value)}
    toggleByPath={(path) => toggleByPath([...staticPathToHere, ...path])}
    />
  );
};
