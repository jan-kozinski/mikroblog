import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../../app-state/actions/postActions";
import {
  socketConnect,
  socketDisconnect,
} from "../../app-state/actions/socketActions";
import PostsLoading from "../PostsLoading";
import Posts from "../Posts";
import AddPost from "../AddPost";
import Footer from "./Footer";
import Userpannel from "../userpannel/Userpannel";
import Paginator from "../Paginator";
import Wrapper from "./Wrapper";
//import useWebSocket from "../../hooks/useWebSocket";

class Wall extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    postsAddedSinceLastFetching: PropTypes.number.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
  };

  componentDidMount() {
    let { page } = this.props;

    if (page && page > 0) this.props.fetchPosts(page);
    else this.props.fetchPosts(1);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading === true && this.props.isLoading === false) {
      //establish initial ws connection
      this.props.isAuthenticated && this.props.user
        ? this.props.socketConnect(this.props.user.name)
        : this.props.socketConnect();
    } else if (prevProps.user !== this.props.user) {
      //reestablish ws after user logs out or logs in
      this.props.socketConnect();
      this.props.isAuthenticated && this.props.user
        ? this.props.socketConnect(this.props.user.name)
        : this.props.socketConnect();
    }
  }

  render() {
    const { postsAddedSinceLastFetching } = this.props;
    return (
      <Wrapper>
        <AddPost />
        {postsAddedSinceLastFetching > 0 ? (
          <div className="post flex items-baseline justify-center">
            <span className="mr-4">
              There {`${postsAddedSinceLastFetching > 1 ? "are " : "is "}`}
              <p className="text-secondary inline">
                {postsAddedSinceLastFetching + " "}
              </p>
              new post{postsAddedSinceLastFetching > 1 && "s"},
            </span>
            <p
              onClick={() => this.props.fetchPosts(1)}
              className="btn"
              style={{ margin: 0 }}
            >
              show them
            </p>
          </div>
        ) : null}
        <div>{this.props.isLoading ? <PostsLoading /> : <Posts />}</div>

        <Paginator />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.entities.loading,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  postsAddedSinceLastFetching: state.entities.postsAddedSinceLastFetching,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  fetchPosts,
  socketConnect,
  socketDisconnect,
})(Wall);
