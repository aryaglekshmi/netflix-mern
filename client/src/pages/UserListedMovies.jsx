import { getUsersLikedMovies } from "../state/slice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase.conf";
import Card from "../components/Card";

export default function UserListedMovies() {
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  useEffect(() => {
    if (email) {
      dispatch(getUsersLikedMovies(email));
    }
  }, [email]);

  return (
    <div className="mx-4 my-2">
      <Header />
      <div className="content d-flex flex-column mt-5">
        <h2 className="ms-3">My List</h2>
        <div className="d-flex flex-wrap gap-3">
          {movies.map((movie, index) => {
            return (
              <Card
                movie={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
