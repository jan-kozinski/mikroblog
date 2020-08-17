import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../app-state/actions/postActions";
import UploadFile from "./UploadFile";

const AddPost = (props) => {
  const [text, setText] = useState("");
  const [fileFormData, setFileFormData] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!props.isAuthenticated) {
      return;
    }
    const newPost = {
      text,
      author: props.user.name,
    };
    //Check if post containts an image
    fileFormData
      ? props.addPost(newPost, fileFormData)
      : props.addPost(newPost);

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

        <div className="flex flex-row justify-between">
          <UploadFile setFileFormData={setFileFormData} />
          <input
            className={`${props.isAuthenticated ? "btn" : "btn-disabled"}`}
            type="submit"
            value="Submit"
          />
        </div>
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
