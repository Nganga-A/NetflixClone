import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";

export default function Netflix() {

  const [isScrolled, setIsScrolled] = useState(false);

 // Event handler for window scroll
 window.onscroll = () => {
  // Update isScrolled state based on the Y offset of the page
  setIsScrolled(window.pageYOffset === 0 ? false : true);

  // Cleanup: Remove the scroll event listener when the component is unmounted
  return () => (window.onscroll = null);
};

  return (
    <div>
      <Navbar isScrolled={isScrolled} />
    </div>
  )
}

