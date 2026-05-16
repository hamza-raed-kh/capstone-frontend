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
		setOptions(prev =>
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
        setOptions(prev =>
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
                } else {
                    delete current[key];
                }
            })
        );
    }
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
	function moveBetweenPaths(fromPath, fromIndex, toPath, toIndex){
		setOptions(prev =>
			produce(prev, draft => {
				let fromList = draft;
				let toList = draft;

				// Navigate to source list
				for(let i = 0; i < fromPath.length; i++){
					fromList = fromList[fromPath[i]];
				}

				// Navigate to destination list
				for(let i = 0; i < toPath.length; i++){
					toList = toList[toPath[i]];
				}

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
		<ChoiceOptions
			options={options}
			path={[...staticPathToHere]}
			actionByPath={actionByPath}
		/>
	);
}