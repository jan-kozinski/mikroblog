import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../../app-state/actions/postActions";
import PostsLoading from "../PostsLoading";
import Posts from "../Posts";
import AddPost from "../AddPost";
import Footer from "./Footer";
import Userpannel from "../userpannel/Userpannel";

class Wall extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    fetchPosts: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <>
        <div className="flex flex-col-reverse md:flex-row bg-gray-300 min-h-screen">
          <div id="offset" className="md:w-1/6 sm:w-0"></div>
          <div className="md:w-1/2 sm:w-full">
            <AddPost />
            <div>{this.props.isLoading ? <PostsLoading /> : <Posts />}</div>
          </div>
          <div className="md:w-1/3 sm:w-full">
            <Userpannel />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.entities.loading,
});

export default connect(mapStateToProps, { fetchPosts })(Wall);
