import { useState } from "react";
import { produce } from "immer";
import FormPage from "./FormPage";

/**
 * Storybook configuration for the `formpage` component.
 * This file defines the stories for the `formpage` component, which are used to
 * visualize and test the component in isolation.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/Form/FormPage",
    component: FormPage,
}

/**
 * The only variant of the `FormPage` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Default = () => {
  const [pages, setPages] = useState([
		{
			title: 'null',
			questions: [
				{
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
				}
			]
		},
		{
			title: 'cwds',
		},
		{
			title: 'WWEWX',
		},
		{
			title: '2d  2d2d2',
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
		setPages(prev =>
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
        setPages(prev =>
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
        setPages(prev =>
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
        setPages(prev =>
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
		setPages(prev =>
			produce(prev, draft => {
				let fromList = draft;
				let toList = draft;
				fromPath = [...path, ...fromPath];
				toPath = [...path, ...toPath];

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

	return (<>
		{pages.map((_, i) =>{
			return (
				<FormPage
					page={i}
					max_pages={pages.length}
					title={_.title}
					updateByPath={(path, value) => updateByPath([...staticPathToHere, ...path], value)}
					toggleByPath={(path) => toggleByPath([...staticPathToHere, ...path])}
					appendByPath={(path, value) => appendByPath([...staticPathToHere, ...path], value)}
					deleteByPath={(path) => deleteByPath([...staticPathToHere, ...path])}
					moveBetweenPaths={(fromPath, fromIndex, toPath, toIndex) => moveBetweenPaths([...staticPathToHere, ...fromPath], fromIndex, [...staticPathToHere, ...toPath], toIndex)}
					onDelete={() => deleteByPath([...staticPathToHere, i])}
				/>
			)
		})}
	</>);
};