import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase.conf";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../state/slice";
import { API_URL } from "../utils/constants";

export default React.memo(function Card({ index, movie, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  const addToList = async () => {
    try {
      await axios.post(API_URL + "user/movies/like", {
        email,
        data: movie,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="position-relative"
      style={{ maxWidth: "230px", width: "230px", cursor: "pointer" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.image}`}
        alt="card"
        className="img-fluid rounded"
        onClick={() => navigate("/player")}
      />
<div className="position-absolute bottom-0 p-2 small">{movie.name}</div>
      {isHovered && (
        <div
          className="position-absolute shadow-lg bg-dark rounded"
          style={{
            width: "20rem",
            bottom: "3rem",
            left: "3rem",
            transition: "0.3s ease-in-out",
            zIndex: "1000"
          }}
        >
          <div className="position-relative" >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.image}`}
              alt="card"
              className="img-fluid rounded h-100 w-100 object-fit-cover"
              
              onClick={() => navigate("/player")}
            />
          </div>
          <div className="p-3 w-100">
            <h3
              className="text-light"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/player")}
            >
              {movie.name}
            </h3>
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-3">
                <IoPlayCircleSharp
                  className="text-light"
                  title="Play"
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill
                  className="text-light"
                  title="Like"
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                />
                <RiThumbDownFill
                  className="text-light"
                  title="Dislike"
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                />
                {isLiked ? (
                  <BsCheck
                    className="text-light"
                    title="Remove from List"
                    style={{ fontSize: "2rem", cursor: "pointer" }}
                    onClick={() =>
                      dispatch(
                        removeMovieFromLiked({ movieId: movie.id, email })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus
                    className="text-light"
                    title="Add to my list"
                    style={{ fontSize: "2rem", cursor: "pointer" }}
                    onClick={addToList}
                  />
                )}
                <BiChevronDown
                  className="text-light"
                  title="More Info"
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                />
              </div>
            </div>
            <div className="d-flex mt-3">
              <ul className="list-unstyled d-flex gap-3 text-light">
                {movie.genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
