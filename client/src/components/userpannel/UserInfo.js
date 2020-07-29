import React from "react";
import { connect } from "react-redux";
import { logout } from "../../app-state/actions/authActions";

const UserInfo = (props) => {
  const onClick = () => {
    props.logout();
  };
  return (
    <div>
      <button onClick={onClick}>Logout</button>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { logout })(UserInfo);
