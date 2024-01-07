import React from 'react'
import styled from "styled-components"
import logo from "../assets/logo.png"

export default function Header(props) {
  return (
    <Container>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}> {props.login ? "Log in" : "Sign in"} </button>
    </Container>
  )
}

const Container = styled.div``;