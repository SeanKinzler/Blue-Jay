import React, { Component } from 'react';

export default ({signupHandler}) => {
  return (
  	<div>
  		<h1>Signup</h1>
  		<form onSubmit={signupHandler}>
  			<input type='text' name='username' placeholder='Username' required />
  			<input type='password' name='password1' placeholder='Password' required />
  			<input type='password' name='password2' placeholder='Confirm password' required />
  			<input type='submit' name='submit' value='Submit' />
  		</form>
  	</div>
  );
};



