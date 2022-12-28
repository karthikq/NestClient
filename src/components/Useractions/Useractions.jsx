/** @format */

import React from "react";
import "./useractions.styles.scss";
import TimeAgo from "react-timeago";
const Useractions = ({ data }) => {
  return (
    <div className="useraction-wrapper">
      {data.map((item) => (
        <div className="useraction-contents">
          <h2>{item.title}</h2>
          <img src="" alt="err" />
          <div className="useraction-likes">
            <span>{item.likes?.length}Likes</span>
            <span>{item.comments?.length}Comments</span>
          </div>
          <div className="">
            <TimeAgo date={new Date(item.created_at)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Useractions;
