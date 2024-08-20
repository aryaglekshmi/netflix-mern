import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TMDB_BASE_URL, API_KEY_MOVIE } from "../utils/constants";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  movies: [],
  genres: [],
  genresLoaded: false,
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const {
      data: { genres },
    } = await axios.get(
      `${TMDB_BASE_URL}genre/movie/list?api_key=${API_KEY_MOVIE}`
    );
    return genres;
  });
  
  const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path)
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
        });
    });
  };
  
  const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
  };
  
  export const fetchDataByGenre = createAsyncThunk(
    "netflix/genre",
    async ({ genre, type }, thunkAPI) => {
      const {
        netflix: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `${TMDB_BASE_URL}discover/${type}?api_key=${API_KEY_MOVIE}&with_genres=${genre}`,
        genres
      );
    }
  );
  
  export const fetchMovies = createAsyncThunk(
    "netflix/trending",
    async ({ type }, thunkAPI) => {
      const {
        netflix: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `${TMDB_BASE_URL}trending/${type}/week?api_key=${API_KEY_MOVIE}`,
        genres,
        true
      );
    }
  );
  
  export const getUsersLikedMovies = createAsyncThunk(
    "netflix/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
      return movies;
    }
  );
  
  export const removeMovieFromLiked = createAsyncThunk(
    "netflix/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:5000/api/user/remove", {
        email,
        movieId,
      });
      return movies;
    }
  );
  


const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const { setIsLoggedIn } = NetflixSlice.actions;
export default NetflixSlice.reducer;
