import Icon from '../../Icon/Icon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import NumberInput from '../../inputs/NumberInput/NumberInput';
import TextInput from '../../inputs/TextInput/TextInput';

import styles from './FormPageHeader.module.css'

/**
 * A formpageheader component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the formpageheader, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the formpageheader.
 * @param {string} props.page - The order of this page in the form.
 * @param {string} props.max_pages - The number of pages in the form.
 * @param {string} props.title - The title of this page in the form.
 * @param {Function} props.onChangePage - The function to be called when 'page' is changed.
 * @param {Function} props.onChangeTitle - The function to be called when 'title' is changed.
 * @param {Function} props.onDelete - The function to be called to delete page.
 * @returns {JSX.Element} The rendered formpageheader element.
 */
const FormPageHeader = ({ page, max_pages, title, onChangePage, onChangeTitle, onDelete }) => {

	return (
		<div className={styles.pageHeader}>
			<div className={styles.pageHeaderFirst}>
				<div className={styles.pageHeaderFirstLeft}>
					<div className={styles.pageHeaderFirstLeftIcon}>
						<Icon icon={'material-symbols:info-rounded'} size={32}/>
					</div>
					<div className={styles.pageHeaderFirstLeftNumber}>
						<label htmlFor={'Page'}>Page</label>
						<div className={styles.pageHeaderFirstLeftField}>
							<NumberInput
								label={'Page'}
								inlineLabel
								value={page + 1}
								onChange={onChangePage}
								max={max_pages + 1}
							/>
						</div>
						<span>:</span>
					</div>
				</div>
				<div className={styles.pageHeaderFirstRight} onClick={onDelete}>
					<Icon icon={'mdi:close'} size={24}/>
				</div>
			</div>
			<div className={styles.pageHeaderSecond}>
				<label className={styles.rowLabel} htmlFor={'Title'}>Title:</label>
				<TextInput
					label={'Title'}
					inlineLabel
					value={title}
					onChange={onChangeTitle}
				/>
			</div>
		</div>
	);
}

export default FormPageHeader
