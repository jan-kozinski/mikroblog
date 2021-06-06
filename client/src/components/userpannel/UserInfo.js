import React from "react";
import { connect } from "react-redux";
import { logout } from "../../app-state/actions/authActions";

const UserInfo = (props) => {
  const onLogoutClick = () => {
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
          <a href="/messages" className="panel-tiles">
            messages
          </a>
          <a href="#" className="panel-tiles">
            settings
          </a>
          <a href={`/user/${props.user.name}`} className="panel-tiles">
            your posts
          </a>
          <a href="#" className="panel-tiles">
            friends
          </a>
        </div>

        <button className="mr-4 ml-auto w-24 btn" onClick={onLogoutClick}>
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
