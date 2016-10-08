import React from 'react';

const StreamForm = ({submitHandler, categories}) => {
	const renderCategories = () => {
		return (
			<select>
				<option value="" disabled>Category</option>
				{ categories.map((category) => {
					return (
						<option key={category} value={category}>{ category }</option>
					)
				})}
			</select>			
		)
	}
	return (
		<form onSubmit={submitHandler}>
			<input type='text' placeholder='Title' />
			<input type='text' placeholder='Description' />
			{ renderCategories() }
			<input className='btn' type='submit' value='Submit' />
		</form>
	)
}

export default StreamForm;