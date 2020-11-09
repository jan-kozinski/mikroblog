import React from "react";
import { deletePost, togglePostLike } from "../app-state/actions/postActions";
import { connect } from "react-redux";
import LikeButton from "./LikeButton";

function Posts(props) {
  const deletePost = (post) => {
    if (props.user && post.author === props.user.name) {
      props.deletePost(post._id);
    } else return;
  };
  if (props.error.status === 404)
    return <div className="post">No more posts!</div>;
  return (
    <div>
      {props.posts.map((post) => (
        <div className="post" key={post._id}>
          <span className="flex flex-row justify-between">
            <p>
              <a className="font-bold text-secondary inline" href={`/user/${post.author}`}>{post.author}</a>{" "}
              says:
            </p>
            <LikeButton post={post} />
          </span>
          <hr />
          {post.text}
          {post.imageURL ? (
            <img src={post.imageURL} alt="obrazek" className="lg:p-4" />
          ) : null}
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
  error: state.error,
});

export default connect(mapStateToProps, { deletePost, togglePostLike })(Posts);
