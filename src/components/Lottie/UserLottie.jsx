/** @format */

import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./129805-404-brain-explosion.json";

const UserLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default UserLottie;
