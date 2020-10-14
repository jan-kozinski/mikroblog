import React, { useState, useEffect } from "react";
const UploadFile = ({ setFileFormData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handling file selection from input
  const onFileSelected = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
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

      //Creating a FormData object and asigning uploaded image with date-based unique name to the "image field"
      let fileData = new FormData();
      fileData.set("image", selectedFile, `${Date.now()}-${selectedFile.name}`);
      setFileFormData(fileData);
      //---
    }
  }, [selectedFile, setFileFormData]);

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
        Add Image
      </label>
      <input
        type="file"
        name="image"
        className="hidden"
        ref={hiddenFileInput}
        onChange={onFileSelected}
      />
    </>
  );
};

export default UploadFile;
