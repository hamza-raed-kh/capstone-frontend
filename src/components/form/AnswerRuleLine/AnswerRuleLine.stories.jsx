import { useState } from "react";
import { produce } from "immer";
import AnswerRuleLine from "./AnswerRuleLine";

/**
 * Storybook configuration for the `answerruleline` component.
 * This file defines the stories for the `answerruleline` component, which are used to
 * visualize and test the component in isolation.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/Form/AnswerRuleLine",
    component: AnswerRuleLine,
}

/**
 * The only variant of the `AnswerRuleLine` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Default = () => {
    let [rule, setRule] = useState({
        active: true,
        num: 200,
    });
    
    function updateByPath(path, value){
        setRule(prev =>
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
        setRule(prev =>
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
  
    return (
    <AnswerRuleLine 
        rule={rule}
        label={'Example'}
        updateByPath={(path, value) => updateByPath([...path], value)}
        toggleByPath={(path) => toggleByPath([...path])}
    />
  );
};
