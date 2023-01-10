import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./uploadedfiles.styles.scss";
const UploadedFileContents = ({ images, handleRemove }) => {
  return (
    <div className="uploadedcontents-wrapper">
      {images?.names?.map((item, index) => (
        <div key={item} className="uploaded-item ">
          <div id="upload-scroller" className="upload-progress-status"></div>
          <div id="upload-checkicon" className="uploaded-checkicon">
            <img src="https://i.ibb.co/9YWkXTT/accept.png" alt="tickmark" />
          </div>
          <img className="uploaded-img" src={images?.urls[index]} alt="err" />
          <div className="uploaded-item-details">
            <CloseIcon
              className="cancel-upload-icon"
              onClick={() => handleRemove(index)}
            />

            <p>{item.substring(0, 18)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadedFileContents;
