import {
    configureStore,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

// const API_KEY = process.env.REACT_APP_API_KEY;
// const TMDB_BASE_URL = process.env.REACT_APP_API_URL;




// Define the initial state for the Netflix slice of the Redux store
const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

// Async thunk to fetch movie genres from The Movie Database (TMDb) API
export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const {
        data: { genres },
    } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    return genres;
});

// Helper function to create an array of movie objects from raw data
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

// Helper function to fetch raw movie data based on API, genres, and optional paging
const getRawData = async (api, genres, paging) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const {
            data: { results },
        } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
        createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};

// Async thunk to fetch movie data based on a specific genre and type
export const fetchDataByGenre = createAsyncThunk(
    "netflix/genre",
    async ({ genre, type }, thunkAPI) => {
        const {
            netflix: { genres },
        } = thunkAPI.getState();
        return getRawData(
            `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
            genres
        );
    }
);

// Async thunk to fetch trending movies or TV shows from TMDb
export const fetchMovies = createAsyncThunk(
    "netflix/trending",
    async ({ type }, thunkAPI) => {
        const {
            netflix: { genres },
        } = thunkAPI.getState();
        return getRawData(
            `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
            genres,
            true
        );
    }
);

// Async thunk to fetch movies liked by a user based on their email
export const getUsersLikedMovies = createAsyncThunk(
    "netflix/getLiked",
    async (email) => {
        const {
            data: { movies },
        } = await axios.get(`https://netflix-api-cija.onrender.com/api/user/liked/${email}`);
        return movies;
    }
);

// Async thunk to remove a movie from a user's liked list
export const removeMovieFromLiked = createAsyncThunk(
    "netflix/deleteLiked",
    async ({ movieId, email }) => {
        const {
            data: { movies },
        } = await axios.put("https://netflix-api-cija.onrender.com/api/user/remove", {
            email,
            movieId,
        });
        return movies;
    }
);

// Create a Redux slice for the Netflix-related state and actions
const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        // Reducer for handling fulfilled action of fetching genres
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        // Reducer for handling fulfilled action of fetching trending movies
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        // Reducer for handling fulfilled action of fetching movies by genre
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        // Reducer for handling fulfilled action of fetching liked movies by user
        builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        // Reducer for handling fulfilled action of removing a movie from liked list
        builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
});

// Create a Redux store using the configured store with the Netflix slice reducer
export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});

// Export specific actions from the Netflix slice
export const { setGenres, setMovies } = NetflixSlice.actions;
