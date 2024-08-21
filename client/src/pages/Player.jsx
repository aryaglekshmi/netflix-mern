import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import video from "./../assets/video.mp4";
import { useNavigate } from "react-router-dom";

function Player() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page in the history
  };
  return (
    <div className="w-100 h-100 ">
      <div className="p-4 fs-4 z-1 position-absolute">
        <BsArrowLeft onClick={()=>navigate(-1)} />
      </div>

      <video
        className="w-100 h-100 object-fit-cover"
        src={video}
        autoPlay
        controls
        loop
      />
    </div>
  );
}

export default Player;
