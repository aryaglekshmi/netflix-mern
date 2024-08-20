import React, { useState } from "react";
import BgImg from "../components/BgImg";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase.conf";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from "../state/slice";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoadingIcon] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (eve) => {
    eve.preventDefault();
    try {
      const { email, password } = formValues;
      setLoadingIcon(true);
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingIcon(false);
    }
  };

  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (currUser) {
      dispatch(setIsLoggedIn(true));
      navigate("/");
    } 
  });

  return (
    <div className="position-relative text-white d-flex flex-column min-vh-100 justify-content-center align-items-center position-relative bg-light">
      <BgImg />
      <div className="position-absolute h-100 w-100 top-0 start-0 d-flex flex-column">
        <Header login />
        <div
          className="text-center d-flex flex-column justify-content-center flex-grow-1 m-auto"
          style={{ maxWidth: "80%" }}
        >
          <div className="mb-4">
            <h1 className="display-1 fw-bold">
              Unlimited movies, TV shows and more.
            </h1>
            <h4 className="display-5 fw-bold">
              Watch anywhere. Cancel anytime.
            </h4>
            <h6 className="display-7 fw-bold">
              Ready to watch? Enter your email to create or restart your
              membership.
            </h6>
          </div>
          <form>
            <div className="d-flex column-gap-2 justify-space-between">
              <input
                className="w-100 mb-2 bg-white"
                type="email"
                placeholder="Email address"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              {showPassword && (
                <input
                  className="w-100 mb-2 bg-white"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              )}
              {!showPassword && (
                <button
                  className="btn-main mb-2"
                  onClick={() => setShowPassword(true)}
                >
                  Get Started
                </button>
              )}
            </div>
            <button
              type="submit"
              className="btn-main mb-2"
              onClick={handleSignIn}
            >
              Sign Up
              {isLoading && (
                <span
                  className="spinner-border spinner-border-sm ms-2"
                  aria-hidden="true"
                ></span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
