import React from "react";
import Lottie from "react-lottie";
import animationData from "../Animations/loader.json";

const Loader = () => {
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
      <Lottie options={defaultOptions} width={70} />;
    </div>
  );
};

export default Loader;
