import React from "react";

export default function Navbar() {
  return (
    <div className="w-auto bg-primary p-4 ">
      <h1
        className="w-32 p-4 pt-2 cursor-pointer
         text-white  text-xl font-bold text-center
         border-transparent border-solid border-b-4
         duration-150 hover:text-secondary hover:border-white
      "
      >
        Mikroblog
      </h1>
    </div>
  );
}
