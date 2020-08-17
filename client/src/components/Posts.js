import React from "react";
import { deletePost } from "../app-state/actions/postActions";
import { connect } from "react-redux";

function Posts(props) {
  const deletePost = (post) => {
    if (props.user && post.author === props.user.name) {
      props.deletePost(post._id);
    } else return;
  };

  return (
    <div>
      {props.posts.map((post) => (
        <div className="post" key={post._id}>
          <p className="font-bold text-secondary inline">{post.author}</p> says:
          <hr />
          {post.text}
          {post.imageURL ? <img src={post.imageURL} alt="obrazek" /> : null}
          <button
            className={`${
              props.user && post.author === props.user.name
                ? "btn-danger"
                : "btn-disabled"
            } ml-auto`}
            onClick={() => deletePost(post)}
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
  user: state.auth.user,
});

export default connect(mapStateToProps, { deletePost })(Posts);
