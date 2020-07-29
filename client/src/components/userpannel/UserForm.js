import React, { useState } from "react";
import Login from "./user-form/Login";
import Register from "./user-form/Register";

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import TextTransition from "react-text-transition";

function UserForm(props) {
  const [loginOverRegistration, setForm] = useState(true);

  return (
    <div className="bg-white text-black pb-4 m-4 rounded-lg ">
      <h3 className="shadow-btn bg-secondary p-2 rounded-t-lg h-10">
        <TextTransition
          text={loginOverRegistration ? "Login" : "Register"}
          delay={600}
        />
      </h3>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "5%",
          width: 0,
          height: 0,
          borderLeft: "0.7rem solid transparent",
          borderRight: "0.7rem solid transparent",
          borderTop: "0.7rem solid #ff5500",
        }}
      />
      <SlideDown>{loginOverRegistration ? <Login /> : <Register />}</SlideDown>

      <hr className="w-11/12 mx-auto border-blue-900 mb-4" />
      <div
        className="cursor-pointer underline text-orange-800 hover:text-primary h-8 select-none px-4"
        onClick={() => setForm(!loginOverRegistration)}
      >
        <TextTransition
          text={
            loginOverRegistration
              ? "New here? Go ahead and Sign Up!"
              : "Already have an account? Sign in now!"
          }
          delay={600}
        />
      </div>
    </div>
  );
}

export default UserForm;
