import { useState } from "react";
import { produce } from "immer";
import FormPageHeader from "./FormPageHeader";

/**
 * Storybook configuration for the `formpageheader` component.
 * This file defines the stories for the `formpageheader` component, which are used to
 * visualize and test the component in isolation.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/Form/FormPageHeader",
    component: FormPageHeader,
}

/**
 * The only variant of the `FormPageHeader` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Default = () => {
	const [pages, setPages] = useState([
		{
			title: 'null',
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
	function moveBetweenPaths(fromPath, fromIndex, toPath, toIndex){
		setPages(prev =>
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

	return (<>
		{pages.map((_, i) =>{
			return (
				<FormPageHeader
					page={i}
					max_pages={pages.length}
					title={_.title}
					onChangePage={(e) => moveBetweenPaths([...staticPathToHere], i, [...staticPathToHere], e.target.value -1)}
					onChangeTitle={(e) => updateByPath([...staticPathToHere, i, 'title'], e.target.value)}
					onDelete={() => deleteByPath([...staticPathToHere, i])}
				/>
			)
		})}
	</>);
};
