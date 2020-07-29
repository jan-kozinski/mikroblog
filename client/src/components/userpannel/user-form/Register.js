import React, { Component } from "react";
import PropTypes from "prop-types";
import { register } from "../../../app-state/actions/authActions";
import { clearErrors } from "../../../app-state/actions/errorActions";

import { connect } from "react-redux";
import Alert from "../../Alert";

class Register extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
  };
  state = {
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
    formHasEmptyFields: false,
  };
  onSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields in form
    if (
      !this.state.email ||
      !this.state.name ||
      !this.state.password ||
      !this.state.repeatPassword
    ) {
      this.setState({
        formHasEmptyFields: true,
      });
      return;
    }
    // Try to register

    this.props.register({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      repeat_password: this.state.repeatPassword,
    });
    // Clear errors
    this.props.clearErrors();
    this.setState({ formHasEmptyFields: false });
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <>
        <form onSubmit={this.onSubmit} className="flex flex-col px-8">
          {this.props.error.id === "REGISTER_FAIL" ? (
            <Alert
              value={
                this.props.error.msg.error ===
                '"repeat_password" must be [ref:password]'
                  ? "Passwords should match"
                  : this.props.error.msg.error
              }
            />
          ) : null}
          {this.state.formHasEmptyFields ? (
            <Alert value="Please fill all the fields!" />
          ) : null}
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            className={`my-2 bg-gray-200 rounded block w-full p-2 ${
              this.state.formHasEmptyFields && !this.state.email
                ? "border border-red-800"
                : ""
            }`}
            placeholder="E-mail"
            onChange={this.onChange}
          />

          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className={`my-2 bg-gray-200 rounded block w-full p-2 ${
              this.state.formHasEmptyFields && !this.state.name
                ? "border border-red-800"
                : ""
            }`}
            placeholder="name"
            onChange={this.onChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className={`my-2 bg-gray-200 rounded block w-full p-2 ${
              this.state.formHasEmptyFields && !this.state.password
                ? "border border-red-800"
                : ""
            }`}
            placeholder="password"
            onChange={this.onChange}
          />
          <label htmlFor="password-repeat">Repeat your password</label>
          <input
            type="password"
            name="repeatPassword"
            className={`my-2 bg-gray-200 rounded block w-full p-2 ${
              this.state.formHasEmptyFields && !this.state.repeatPassword
                ? "border border-red-800"
                : ""
            }`}
            placeholder="password"
            onChange={this.onChange}
          />
          <input className="mb-4 btn" type="submit" value="Sign Up" />
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
