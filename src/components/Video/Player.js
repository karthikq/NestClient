import React from "react";

const Player = ({ url }) => {
  return (
    <>
      <video
        controls
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      >
        <source src={url + "#t=0.1"}></source>
      </video>
    </>
  );
};

export default Player;
