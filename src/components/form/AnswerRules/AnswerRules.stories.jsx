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
		// console.log('Question: ', questions);
    }
	function deleteByPath(path){
        setRules(prev =>
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
        setRules(prev =>
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
		setRules(prev =>
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
    <AnswerRules 
        variant={'num'}
        rules={rules}
        actionByPath={actionByPath}
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
	function deleteByPath(path){
        setRules(prev =>
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
        setRules(prev =>
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
		setRules(prev =>
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
    <AnswerRules 
        variant={'choice'}
        rules={rules}
        path={[...staticPathToHere]}
        actionByPath={actionByPath}
    />
  );
};
