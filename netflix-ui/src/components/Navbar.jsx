import React from 'react'
import styled from "styled-components"
import logo from "../assets/logo.png"
import {Link} from "react-router-dom"


export default function Navbar({isScrolled}) {

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
                <div className={`search`}>

                </div>
            </div>
        </nav>
    </Container>
  );
}


const Container = styled.div``;