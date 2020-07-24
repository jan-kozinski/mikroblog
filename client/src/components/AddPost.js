import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../app-state/actions/postActions";

const AddPost = (props) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      text,
    };
    props.addPost(newPost);
    console.log(newPost);
  };

  return (
    <div className="post" style={{ padding: "2rem" }}>
      <span className="font-bold m-16">Add Post</span>
      <form className="pt-4" onSubmit={onSubmit}>
        <textarea
          className="bg-gray-200 rounded resize-none block w-full p-2"
          style={{ minHeight: "10rem" }}
          onChange={(e) => setText(e.target.value)}
        />
        <input className="btn ml-auto" type="submit" value="Submit" />
      </form>
    </div>
  );
};

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addPost })(AddPost);
