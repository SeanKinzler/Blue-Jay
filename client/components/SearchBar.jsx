import React from 'react';

const SearchBar = ({ onTermChange }) => {
	return (
		<input 
			style={{'textAlign': 'center'}}
			type='text' 
			placeholder='Search for a stream'
			onChange={ e => onTermChange(e.target.value) }
      className='color1-text text-darken-1'
		/>
	)
}

export default SearchBar;