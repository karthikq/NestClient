import React,{useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./uploadedfiles.styles.scss";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CustomDialog from "../CustomDialog/CustomDialog"

const UploadedFiles = ({ items, handleRemove, activeClose, editState,setUploadedImages }) => {
  const [openDialogbox,setOpenDialogbox] = useState(false)


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
        { openDialogbox && <CustomDialog
          setOpen={setOpenDialogbox}
          open={openDialogbox}
          setItems={setUploadedImages}
        />}
          <div>
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
          </div>
          <div className="add-images">
            <ControlPointIcon className="add-icon"  onClick={()=>setOpenDialogbox(true)}/>
          </div>
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
