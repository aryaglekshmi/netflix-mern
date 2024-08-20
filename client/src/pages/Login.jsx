import React, { useState, useEffect } from "react";
import BgImg from "../components/BgImg";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase.conf";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from "../state/slice";

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoadingIcon] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setLoadingIcon(true);
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingIcon(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currUser) => {
      if (currUser) {
        dispatch(setIsLoggedIn(true));
        navigate("/");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch, navigate]);


  return (
    <div className="position-relative text-white d-flex flex-column min-vh-100 justify-content-center align-items-center bg-light">
      <BgImg />
      <div className="position-absolute h-100 w-100 top-0 start-0 d-flex flex-column">
        <Header login />
        <div
          className="text-center d-flex flex-column justify-content-center flex-grow-1 m-auto"
          style={{ maxWidth: "80%" }}
        >
          <div className="modal-popup">
            <div className="mb-4">
              <h6 className="display-6 fw-bold">Login</h6>
            </div>
            <form>
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
              <button
                type="submit"
                className="btn-main mb-2 w-100"
                onClick={handleLogin}
              >
                Log In
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
    </div>
  );
}
