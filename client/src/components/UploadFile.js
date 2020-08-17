import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadFile = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Select your file first");
  const [imageUrl, setImageUrl] = useState("");

  // Handling file selection from input
  const onFileSelected = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      // setIsDisabled(false); // Enabling upload button
      // setButtonText("Let's upload this!");
    }
  };
  const onFileInputClick = (e) => {
    hiddenFileInput.current.click();
  };
  // Setting image preview
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);

      //TEST
      let fileData = new FormData();
      fileData.set("image", selectedFile, `${Date.now()}-${selectedFile.name}`);
      props.setFileFormData(fileData);
      //---
    }
  }, [selectedFile]);

  // Uploading image to Cloud Storage
  const handleFileUpload = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    // setIsDisabled(true);
    // setButtonText("Wait we're uploading your file...");

    try {
      if (selectedFile !== "") {
        // Creating a FormData object
        let fileData = new FormData();

        // Adding the 'image' field and the selected file as value to our FormData object
        // Changing file name to make it unique and avoid potential later overrides
        fileData.set(
          "image",
          selectedFile,
          `${Date.now()}-${selectedFile.name}`
        );

        //Passing image to add post request
        props.setFileFormData(fileData);

        // const response = await axios({
        //   method: "post",
        //   url: "/api/upload",
        //   data: fileData,
        //   headers: { "Content-Type": "multipart/form-data" },
        // });
        // setImageUrl(response.data.fileLocation);
        // setIsLoading(false);
        // setIsSuccess(true);

        // Reset to default values after 3 seconds
        // setTimeout(() => {
        //   setSelectedFile(null);
        //   setPreview(null);
        //   setIsSuccess(false);
        //   setFileName(null);
        //   setButtonText("Select your file first");
        // }, 3000);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setFileName(null);

      setTimeout(() => {
        setIsError(false);
        setButtonText("Select your file first");
      }, 3000);
    }
  };

  const hiddenFileInput = React.useRef(null);

  return (
    <>
      {preview ? (
        <img
          src={preview}
          className="m-2"
          style={{
            maxWidth: "2.5rem",
            maxHeight: "2.5rem",
            objectFit: "cover",
          }}
          alt="Preview"
        />
      ) : null}
      <label className="btn" htmlFor="image" onClick={onFileInputClick}>
        Choose file
      </label>
      <input
        type="file"
        name="image"
        className="hidden"
        ref={hiddenFileInput}
        onChange={onFileSelected}
      />
      {/* <button
          type="submit"
          style={{
            display: "inline-block",
          }}
          className="btn"
          disabled={isDisabled}
          tabIndex={0}
        >
          {buttonText}
        </button> */}
    </>
  );
};

export default UploadFile;
