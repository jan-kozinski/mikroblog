import React from "react";
import Userpannel from "../userpannel/Userpannel";
import Footer from "./Footer";

function Wrapper({ children }) {
  return (
    <>
      <div className="flex flex-col-reverse limit-width xl:mx-auto lg:flex-row min-h-screen ">
        <div id="offset" className="xl:w-1/6 sm:w-0"></div>
        <div className="xl:w-1/2 lg:w-2/3 md:w-4/5 md:mx-auto sm:w-full">
          {children}
        </div>
        <div className="lg:w-1/3 md:w-4/5 md:mx-auto sm:w-full">
          <Userpannel />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Wrapper;
