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
		// console.log('Question: ', questions);
    }
	function deleteByPath(path){
        setRule(prev =>
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
        setRule(prev =>
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
		setRule(prev =>
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
  
    return (
    <AnswerRuleLine 
        rule={rule}
        label={'Example'}
		path={[...staticPathToHere]}
        actionByPath={actionByPath}
    />
  );
};
