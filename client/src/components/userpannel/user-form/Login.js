import React, { useState } from "react";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    props.login({
      email,
      password,
    });
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col px-8">
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          name="email"
          className="my-2 bg-gray-200 rounded block w-full p-2"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="my-4 bg-gray-200 rounded block w-full p-2"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="mb-4 btn" type="submit" value="Sign in" />
      </form>
    </>
  );
}
