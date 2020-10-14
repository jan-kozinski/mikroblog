import React from "react";
import logo from "../../logo.png";

export default function Navbar() {
  return (
    <div className="w-auto bg-primary pl-4 ">
      <h1
        className="w-56 cursor-pointer flex items-center
         text-white  text-3xl  text-center
         border-transparent border-solid border-b-4
         duration-150 hover:text-secondary hover:border-white
      "
      >
        <img className="h-16 px-2" src={logo} alt="logo"></img>
        <a href="/">Mikroblog</a>
      </h1>
    </div>
  );
}
