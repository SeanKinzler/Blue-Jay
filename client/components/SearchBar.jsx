import React from 'react';

const SearchBar = ({ onTermChange }) => {
	return (
		<input 
			style={{'text-align': 'center'}}
			type='text' 
			placeholder='Search for a stream'
			onChange={ e => onTermChange(e.target.value) } 
		/>
	)
}

export default SearchBar;