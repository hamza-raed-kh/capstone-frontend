import Icon from '../../Icon/Icon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import NumberInput from '../../inputs/NumberInput/NumberInput';
import TextInput from '../../inputs/TextInput/TextInput';

import styles from './FormPage.module.css'
import FormPageHeader from '../FormPageHeader/FormPageHeader';

/**
 * A formpage component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the formpage, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the formpage.
 * @param {string} props.page - The order of this page in the form.
 * @param {string} props.max_pages - The number of pages in the form.
 * @param {string} props.title - The title of this page in the form.
 * @param {Function} props.onChangePage - The function to be called when 'page' is changed.
 * @param {Function} props.onChangeTitle - The function to be called when 'title' is changed.
 * @param {Function} props.updateByPath - The function to update a value in this page.
 * @param {Function} props.toggleByPath - The function to toggle a boolean value in this page.
 * @param {Function} props.deleteByPath - The function to delete a value in this page.
 * @param {Function} props.appendByPath - The function to append a value in this page.
 * @param {Function} props.moveBetweenPaths - The function to move value between 2 locations.
 * @param {Function} props.onDelete - The function to be called to delete page.
 * @returns {JSX.Element} The rendered formpage element.
 */
const FormPage = ({ page, max_pages, title, updateByPath, toggleByPath, deleteByPath, appendByPath, moveBetweenPaths, onDelete  }) => {

	return (
		<div className={styles.pageContainer}>
			<FormPageHeader
				page={page}
				max_pages={max_pages}
				title={title}
				onChangePage={(e) => moveBetweenPaths([], page, [], e.target.value -1)}
				onChangeTitle={(e) => updateByPath([page, 'title'], e.target.value)}
				onDelete={onDelete}
			/>
		</div>
	);
}

export default FormPage
