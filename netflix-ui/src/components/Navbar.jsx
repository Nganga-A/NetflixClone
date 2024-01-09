import React, {useState} from 'react'
import styled from "styled-components"
import logo from "../assets/logo.png"
import {Link} from "react-router-dom"
import { firebaseAuth } from "../utils/firebase-config.js";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { signOut } from "firebase/auth";

export default function Navbar({isScrolled}) {

    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);

    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/mylist" },
    ];

    
  return (
    <Container>
        <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
            <div className='left flex a-center'>
                <div className='brand flex a-center j-center'>
                    <img src={logo} alt="logo" />
                </div>
                <ul className='link flex'>
                    {
                        links.map(({pname,link}) => {
                            return (
                                <li key={pname}>
                                    <Link to={link}>{pname}</Link>
                              </li>
                            );
                        })
                    }
                </ul>
            </div>
            <div className="right flex a-center">
                <div className={`search ${showSearch ? "show-search" : ""}`}>
                    <button 
                        onFocus={() => setShowSearch(true)}
                        onBlur={() => {
                        if (!inputHover) {
                        setShowSearch(false);
                            }
                        }}
                    >
                        <FaSearch />
                    </button>
                    <input
                        type="text"
                        placeholder="Search"
                        onMouseEnter={() => setInputHover(true)}
                        onMouseLeave={() => setInputHover(false)}
                        onBlur={() => {
                            setShowSearch(false);
                            setInputHover(false);
                        }}
                    />
                </div>
                <button onClick={() => signOut(firebaseAuth)}>
                    <FaPowerOff />
                </button>
            </div>
        </nav>
    </Container>
  );
}


const Container = styled.div``;