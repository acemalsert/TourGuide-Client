import React from 'react';
import 'aframe';
const Panorama = ({ image }) => {
  return (
    <a-scene>
      <a-sky src={image} rotation="0 -90 0"></a-sky>
      <a-camera position="0 1.6 0"></a-camera>
      <p>??</p>
    </a-scene>
  );
};

export default Panorama;
