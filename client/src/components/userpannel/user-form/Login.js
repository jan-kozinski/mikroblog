import React, { useState } from "react";
import { login } from "../../../app-state/actions/authActions";
import { clearErrors } from "../../../app-state/actions/errorActions";

import { connect } from "react-redux";
import Alert from "../../Alert";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formHasEmptyFields, toggleEmptyFieldAlert] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toggleEmptyFieldAlert(true);
      return;
    }
    toggleEmptyFieldAlert(false);
    props.clearErrors();
    props.login({
      email,
      password,
    });
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col px-8">
        {props.error.id === "LOGIN_FAIL" ? (
          <Alert value="Wrong Credentials!" />
        ) : null}
        {formHasEmptyFields ? (
          <Alert value="Please fill all the fields!" />
        ) : null}
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          name="email"
          className={`my-2 bg-gray-200 rounded block w-full p-2 ${
            formHasEmptyFields && !email ? "border border-red-800" : ""
          }`}
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className={`my-2 bg-gray-200 rounded block w-full p-2 ${
            formHasEmptyFields && !password ? "border border-red-800" : ""
          }`}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="mb-4 btn" type="submit" value="Sign in" />
      </form>
    </>
  );
}

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
