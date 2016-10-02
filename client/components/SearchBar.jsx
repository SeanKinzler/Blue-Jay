import React from 'react';

const SearchBar = ({ onTermChange }) => {
	return (
		<input 
			type='text' 
			onChange={ e => onTermChange(e.target.value) } 
		/>
	)
}

export default SearchBar;