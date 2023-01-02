import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./uploadedfiles.styles.scss";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CustomDialog from "../CustomDialog/CustomDialog";

const UploadedFiles = ({
  items,
  handleRemove,
  activeClose,
  editState,
  setUploadedImages,
}) => {
  const [openDialogbox, setOpenDialogBox] = useState({
    state: false,
    type: "",
  });
  const [images, setImages] = useState({
    files: [],
    urls: [],
    names: [],
  });

  const resulttedImages =
    items.length > 0 && items.length + images.names.length;

  console.log(resulttedImages);

  return (
    <div
      className={
        editState
          ? "uploaded-items-wrapper nopadding"
          : "uploaded-items-wrapper"
      }
    >
      {editState ? (
        <div className="edit-post-wrapper">
          {openDialogbox.state && (
            <CustomDialog
              setOpen={setOpenDialogBox}
              open={openDialogbox}
              setItems={setImages}
            />
          )}
          <div className="edit-post-contents">
            {items.length > 0 &&
              items?.map((item, index) => (
                <div className="uploaded-item ">
                  <div className="upload-progress-status"></div>
                  <div className="uploaded-checkicon">
                    <img
                      src="https://i.ibb.co/9YWkXTT/accept.png"
                      alt="tickmark"
                    />
                  </div>
                  <img className="uploaded-img" src={item.url} alt="err" />
                  <div className="uploaded-item-details">
                    <CloseIcon
                      className="cancel-upload-icon"
                      onClick={() => handleRemove(index)}
                    />

                    <p>{item.name.substring(0, 18)}</p>
                  </div>
                </div>
              ))}
            {images?.names?.map((item, index) => (
              <div className="uploaded-item ">
                <div className="upload-progress-status"></div>
                <div className="uploaded-checkicon">
                  <img
                    src="https://i.ibb.co/9YWkXTT/accept.png"
                    alt="tickmark"
                  />
                </div>
                <img
                  className="uploaded-img"
                  src={images?.urls[index]}
                  alt="err"
                />
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
          {resulttedImages < 3 && (
            <div className="add-images">
              <ControlPointIcon
                className="add-icon"
                onClick={() =>
                  setOpenDialogBox({
                    type: "image",
                    state: true,
                  })
                }
              />
            </div>
          )}
        </div>
      ) : (
        items?.names?.map((item, index) => (
          <div className="uploaded-item ">
            <div className="upload-progress-status"></div>
            <div className="uploaded-checkicon">
              <img src="https://i.ibb.co/9YWkXTT/accept.png" alt="tickmark" />
            </div>
            <img className="uploaded-img" src={items?.urls[index]} alt="err" />
            <div className="uploaded-item-details">
              {activeClose && (
                <CloseIcon
                  className="cancel-upload-icon"
                  onClick={() => handleRemove(index)}
                />
              )}
              <p>{item.substring(0, 18)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UploadedFiles;
