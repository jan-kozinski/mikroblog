import React from "react";
import { connect } from "react-redux";
import { logout } from "../../app-state/actions/authActions";

const UserInfo = (props) => {
  const onClick = () => {
    props.logout();
  };

  return (
    <div>
      <div className="bg-white text-black pb-4 m-4 rounded-lg ">
        <h3 className="shadow-btn bg-secondary p-2 rounded-t-lg h-10"></h3>

        <div className="p-4 text-lg">
          Hello there,
          <p className="font-bold text-secondary inline"> {props.user.name} </p>
        </div>

        <div id="userpanel-grid" className="grid grid-cols-2 mx-4 gap-1">
          <span className="panel-tiles">messages</span>
          <span className="panel-tiles">settings</span>
          <span className="panel-tiles">your posts</span>
          <span className="panel-tiles">friends</span>
        </div>

        <button className="mr-4 ml-auto w-24 btn" onClick={onClick}>
          Logout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(UserInfo);
