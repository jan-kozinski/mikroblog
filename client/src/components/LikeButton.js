import React, { useState } from "react";
import { togglePostLike } from "../app-state/actions/postActions";
import { connect } from "react-redux";

function LikeButton(props) {
  const [requestBeingHandled, setRequestBeingHandledStatus] = useState(false);
  const { post } = props;
  return (
    <p>
      <i
        className={`
                fas fa-heart ${
                  props.user && post.likersIds.includes(props.user._id)
                    ? ""
                    : "hover:"
                }text-pink-700`}
        onClick={async () => {
          if (!requestBeingHandled) {
            setRequestBeingHandledStatus(true);
            await props.togglePostLike(post._id);
            setRequestBeingHandledStatus(false);
          } else return;
        }}
        onMouseEnter={(e) => {
          if (props.user && post.likersIds.includes(props.user._id)) {
            e.target.classList.remove("fa-heart");
            e.target.classList.add("fa-heart-broken");
          }
        }}
        onMouseLeave={(e) => {
          if (props.user && post.likersIds.includes(props.user._id)) {
            e.target.classList.add("fa-heart");
            e.target.classList.remove("fa-heart-broken");
          }
        }}
      ></i>
      {post.likes}
    </p>
  );
}
const mapStateToProps = (state) => ({
  posts: state.entities.posts,
  user: state.auth.user,
});

export default connect(mapStateToProps, { togglePostLike })(LikeButton);
