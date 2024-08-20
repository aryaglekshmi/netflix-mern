import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./utils/firebase.conf";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "./state/slice";
import Player from "./pages/Player";

function App() {
  const dispatch = useDispatch();
  const tabs = [
    { path: "/login", component: <Login /> },
    { path: "/signup", component: <Signup /> },
    { path: "/player", component: <Player /> },
    { path: "/", component: <Home /> },
  ];

  useEffect(()=>{
    onAuthStateChanged(firebaseAuth, (currUser) => {
      if (currUser) {
        dispatch(setIsLoggedIn(true));
      }
    });
  },[dispatch])

  return (
    <Router>
      <Routes>
        {tabs.map((tab, ind) => (
          <Route exact key={ind} path={tab.path} element={tab.component} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
