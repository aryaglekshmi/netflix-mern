import React, { useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase.conf";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../state/slice";
import Slider from "../components/Slider";
import SelectGenre from "../components/SelectGenre";

function Movies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movie" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser);
    else navigate("/login");
  });

  return (
    <div className="position-relative h-100 w-100 overflow-y-auto overflow-x-hidden">
      <Header />
      <div className="data">
      <SelectGenre genres={genres} type="movie" />
        {movies.length ? (
          <Slider movies={movies} />
        ) : (
          <div>
            No Movies avaialble for the selected genre. Please select a
            different genre.
          </div>
        )}
      </div>
    </div>
  );
}

export default Movies;
