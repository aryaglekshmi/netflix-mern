import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase.conf";
import bgImg from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

function Home() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY !== 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="position-relative h-100 w-100">
      <Header isScrolled={isScrolled} />
      <div class="h-100 w-100 position-relative">
        <img
          src={bgImg}
          alt="Background Image"
          className="img-fluid h-100 w-100"
          style={{ filter: "brightness(60%)" }}
        />
        <div
          className="position-absolute"
          style={{ bottom: "30%", left: "5%" }}
        >
          <img src={MovieLogo} alt="Movie Logo" />
          <div className="d-flex justify-space-between py-3">
          <button
              onClick={() => navigate("/player")}
              className="d-flex justify-center align-items-center p-2 fs-6 btn-main btn-secondary me-2 bg-white text-black opacity-75"
            >
              <FaPlay className="me-2"/>
              Play
            </button>
            <button className="d-flex justify-center align-items-center p-2 fs-6 btn-main btn-secondary ms-2">
              <AiOutlineInfoCircle className="me-2"/>
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
