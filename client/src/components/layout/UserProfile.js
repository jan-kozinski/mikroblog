import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../../app-state/actions/postActions";
import PostsLoading from "../PostsLoading";
import Posts from "../Posts";
import AddPost from "../AddPost";
import Footer from "./Footer";
import Userpannel from "../userpannel/Userpannel";
import Paginator from "../Paginator";
import { useParams } from "react-router-dom";
import Wrapper from "./Wrapper";

class UserProfile extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    fetchPosts: PropTypes.func.isRequired,
  };

  componentDidMount() {
    let { page, specifiedAuthor } = this.props;

    if (page && page > 0) this.props.fetchPosts(page, specifiedAuthor);
    else this.props.fetchPosts(1, specifiedAuthor);
  }

  render() {
    return (
      <Wrapper>
        <div className="bg-white text-black pb-4 m-4 rounded-lg ">
          {" "}
          (username) profile <br /> (X) send a message (X) add to friendlist
        </div>

        <div>{this.props.isLoading ? <PostsLoading /> : <Posts />}</div>
        <Paginator specifiedAuthor={this.props.specifiedAuthor} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.entities.loading,
});

export default connect(mapStateToProps, { fetchPosts })(UserProfile);
