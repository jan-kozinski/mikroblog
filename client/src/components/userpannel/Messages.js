import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Wrapper from "../layout/Wrapper";

export const Messages = ({ isAuthenticated }) => {
  useEffect(() => {
    if (isAuthenticated === false) window.location.replace("/");
  }, [isAuthenticated]);

  if (isAuthenticated === null) return <Wrapper>Loading...</Wrapper>;
  return (
    <Wrapper>
      <div
        className="grid grid-cols-3 post min-h-screen"
        style={{ padding: 0 }}
      >
        <div className="flex flex-col border-r border-gray-400">
          <span className=" w-full p-4 border-b border-gray-400">
            your conversations
          </span>
          <br />
          ....
        </div>
        <div className="col-span-2 flex flex-col">
          <span className="bg-secondary p-4 w-full border-b border-gray-400">
            start new conversation
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

Messages.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Messages);
