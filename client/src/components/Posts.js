import React from "react";
import { deletePost } from "../app-state/actions/postActions";
import { connect } from "react-redux";

function Posts(props) {
  return (
    <div>
      {props.posts.map((post) => (
        <div className="post" key={post._id}>
          {post.text}
          <button
            className="btn-danger ml-auto"
            onClick={() => props.deletePost(post._id)}
          >
            Delete post
          </button>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  posts: state.entities.posts,
});

export default connect(mapStateToProps, { deletePost })(Posts);
