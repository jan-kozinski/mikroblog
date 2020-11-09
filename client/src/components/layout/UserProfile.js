import React, { Component } from "react";
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
      <>
        <div className="flex flex-col-reverse limit-width xl:mx-auto lg:flex-row min-h-screen ">
          <div id="offset" className="xl:w-1/6 sm:w-0"></div>
          <div className="xl:w-1/2 lg:w-2/3 md:w-4/5 md:mx-auto sm:w-full">
            
            <div className="bg-white text-black pb-4 m-4 rounded-lg "> (username) profile <br /> (X) send a message (X) add to friendlist</div>

            <div>{this.props.isLoading ? <PostsLoading /> : <Posts />}</div>
            <Paginator specifiedAuthor={this.props.specifiedAuthor}/>
          </div>
          <div className="lg:w-1/3 md:w-4/5 md:mx-auto sm:w-full">
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

export default connect(mapStateToProps, { fetchPosts })(UserProfile);
