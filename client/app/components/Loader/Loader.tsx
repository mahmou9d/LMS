import React from 'react';
import "./Loader.css";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-transparent">
      <div className="loader-wrapper">
        <div className="loader-glow"></div>
        <div className="loader-ring"></div>
        <div className="loader-ring-inner"></div>
      </div>
    </div>
  );
};

export default Loader;