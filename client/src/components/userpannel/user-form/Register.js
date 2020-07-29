import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Register extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
  };
  state = {
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.register({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      repeat_password: this.state.repeatPassword,
    });
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
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            className="my-2 bg-gray-200 rounded block w-full p-2"
            placeholder="E-mail"
            onChange={this.onChange}
          />

          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="my-2 bg-gray-200 rounded block w-full p-2"
            placeholder="name"
            onChange={this.onChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="my-4 bg-gray-200 rounded block w-full p-2"
            placeholder="password"
            onChange={this.onChange}
          />
          <label htmlFor="password-repeat">Repeat your password</label>
          <input
            type="password"
            name="repeatPassword"
            className="my-4 bg-gray-200 rounded block w-full p-2"
            placeholder="password"
            onChange={this.onChange}
          />
          <input className="mb-4 btn" type="submit" value="Sign Up" />
        </form>
      </>
    );
  }
}
