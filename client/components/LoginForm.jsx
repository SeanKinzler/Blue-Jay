import React, { Component } from 'react';

export default ({loginHandler}) => {
	return (
		<div>
			<h1>Login Here</h1>
			<form onSubmit={loginHandler}>
				<input type='text' name='username' placeholder='username' required></input>
				<input type='password' name='password' placeholder='password' required></input>
				<input type='submit' name='submitButton' value='Submit'></input>
			</form>
		</div>
	);
}