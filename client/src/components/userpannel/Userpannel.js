import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser, login, register } from "../../app-state/actions/authActions";
import UserForm from "./UserForm";
import UserInfo from "./UserInfo";

class Userpannel extends Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    this.props.loadUser();
  }

  //TODO: Finish Userinfo component
  render() {
    return (
      <>
        <div>
          {this.props.isLoading ? (
            "Loading..."
          ) : (
            <div>
              {this.props.isAuthenticated ? (
                <div>
                  działa
                  <UserInfo />
                </div>
              ) : (
                <UserForm
                  login={this.props.login}
                  register={this.props.register}
                />
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { loadUser, login, register })(
  Userpannel
);
