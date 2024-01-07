import React from 'react'
import styled from "styled-components"
import BackgroundImage from "../components/BackgroundImage "
import Header from "../components/Header"


export default function Signup() {
  return (
    <Container>
      <BackgroundImage />
      <div className="content">
      <Header login  />
      <div className='body header flex column a-center j-center'>
        <div className='text flex column'>
          <h1>Unlimited movies, TV shows and more</h1>
          <h4>Watch anywhere, cancel anytime.</h4>
          <h6>Ready to watch? Enter your email to create or start membership</h6>
        </div>
        <div className='form'>
          <input type='email' name='email' className='' placeholder='Email Address'/>
          <input type='password' placeholder='Password' name='password'/>
          <button>Get Started</button>
        </div>
        <button>Log In</button>
      </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-templates-rows: 15vh 85vh;
    .header {
      margin-top:-10rem;
    }
    .body {
      gap:1rem;
      .text {
        gap: 1rem;
        text-align:center;
        fontsize: 2rem;
        h1 {
          padding:0 25rem;
        }
      }
      .form {
        display:grid;
        width:60%;
        input {
          color:black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border:1px solid black;
          &:focus {
            outline:none;
          }
        }
        button {
          padding: 0.3rem 0.5rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          border-radius:0.1rem;
          font-weight:bolder;
          font-size: 1.05rem;
        }
      }
    button {
          padding: 0.3rem 0.5rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius:0.1rem;
    font-weight:bolder;
    font-size: 1.05rem;
    }
    }

  }
`;