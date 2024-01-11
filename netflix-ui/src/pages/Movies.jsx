import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardSlider from "../components/CardSlider";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";


function MoviePage() {
const [isScrolled, setIsScrolled] = useState(false);
const movies = useSelector((state) => state.netflix.movies);
const genres = useSelector((state) => state.netflix.genres);
const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

const navigate = useNavigate();
const dispatch = useDispatch();

 // Fetch genres on component mount
useEffect(() => {
    dispatch(getGenres());
}, []);

//Fetch movies when genres are loaded
useEffect(() => {
    if (genresLoaded) {
    dispatch(fetchMovies({ genres, type: "movie" }));
    }
}, [genresLoaded]);


const [user, setUser] = useState(undefined);

onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
});

//Navbar window Scroll
window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
};

return (
    <Container>
    <div className="navbar">
        <Navbar isScrolled={isScrolled} />
    </div>
    <div className="data">
        
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
    </div>
    </Container>
);
}

const Container = styled.div`
.data {
    margin-top: 8rem;
    .not-available {
    text-align: center;
    color: white;
    margin-top: 4rem;
    }
}
`;
export default MoviePage;