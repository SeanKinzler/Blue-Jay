import React from 'react';

const StreamForm = ({submitHandler, categories}) => {
	const renderCategories = () => {
		return (
			<select name='categories' multiple>
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
			<input name='title' type='text' placeholder='Title' />
			<input name='description' type='text' placeholder='Description' />
			{ renderCategories() }
      <div className="chips chips-placeholder"></div>
			<input className='btn' type='submit' value='Create Stream' />
		</form>
	)
}

export default StreamForm;