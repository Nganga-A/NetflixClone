import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider.jsx";

function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  console.log(movies);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
      object-fit: cover;
    }
    .container {
      position: absolute;
      bottom: 4rem;
      @media screen and (max-width: 767px) {
        bottom:2rem;
      }
      .logo {
        img {
          width: 85%;
          height: 90%;
          margin-left: 2rem;
          @media screen and (max-width: 767px) {
            width: 60%;
            margin-left: 1.3rem;
          }
        }
        
      }
      .buttons {
        margin: 1rem 3rem;
        gap: 2rem;
        @media screen and (max-width: 767px) {
          margin: 0.5rem 1.3rem;
          gap: 0.5rem;
        }
        button {
          font-size: 1rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.4rem;
          padding-left: 2rem;
          padding-right: 2rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;

          @media screen and (max-width: 767px) {
            gap:0.5rem;
            font-size: 1rem;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.5rem;
            }
          }
        }
      }
    }
  }
`;
export default Netflix;