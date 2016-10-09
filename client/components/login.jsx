const LoginPage = (props) => {
  return (
    <div className="page loginPage">
      <h1>Login Here</h1>
      <form onSubmit={props.handlers.login}>
        <input type="text" name="username"></input>
        <input type="text" name="password"></input>
        <input type="submit" name="submitButton"></input>
      </form>
    </div>
  );
}

export {LoginPage};