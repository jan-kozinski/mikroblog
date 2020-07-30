import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../app-state/actions/postActions";

const AddPost = (props) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!props.isAuthenticated) {
      console.log(props.isAuthenticated);
      return;
    }
    const newPost = {
      text,
      author: props.user.name,
    };
    console.log(props.user);
    props.addPost(newPost);
    setText("");
  };

  return (
    <div className="post">
      <span className="font-bold m-16">Add Post</span>
      <form className="pt-4" onSubmit={onSubmit}>
        <textarea
          className={`rounded resize-none block w-full p-2
           ${props.isAuthenticated ? "bg-gray-300" : "cursor-not-allowed"}`}
          style={{ minHeight: "10rem" }}
          onChange={(e) => setText(e.target.value)}
          value={text}
          disabled={!props.isAuthenticated}
        />
        <input
          className={`${
            props.isAuthenticated ? "btn" : "btn-disabled"
          } ml-auto`}
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { addPost })(AddPost);
