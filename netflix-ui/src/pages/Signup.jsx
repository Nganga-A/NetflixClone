import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import BackgroundImage from "../components/BackgroundImage "
import Header from "../components/Header"
import { firebaseAuth } from "../utils/firebase-config.js";
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { useNavigate } from "react-router-dom";


export default function Signup() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  // Function to handle user sign-up
  const handleSignUp = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

    // Auth state listener to navigate to home page if user is already authenticated
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/");
      });
  
      return () => unsubscribe(); // Cleanup the listener when the component unmounts
    }, [navigate]);

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
      <Header login  />
      <div className='body flex column a-center  j-center'>
        <div className='text flex column a-center j-center'>
          <h1>Unlimited movies, TV shows and more</h1>
          <h4>Watch anywhere, cancel anytime.</h4>
          <h6>Ready to watch? Enter your email to create or start membership</h6>
        
        <div className='form'>
        <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />

          {/* Password input field (conditionally rendered based on showPassword state) */}
          {showPassword && (
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}

          {/* Button to toggle password visibility */}
          {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
        </div>
        <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: relative;

  .text {
    padding: 10rem 0;
      width: 80vw;

  }
  .content {
    fit-content: stretch;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.7);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-templates-rows: 15vh 85vh;

    .body {
      gap:1rem;

      .text {
        gap: 1rem;
        text-align:center;

        h1 {
          padding:0 20rem;
          @media (max-width: 768px)  {
            padding: 0rem;
            width: 80vw;
          }
        }
      }
      
      .form {
        fit-content: stretch;
        display: grid;
        grid-template-rows: auto auto; // Set to two rows by default
    
        @media (max-width: 768px) {
          grid-template-rows: ${({ showPassword }) =>
            showPassword ? "auto auto" : "auto"}; // Set to two rows for smaller screens if showPassword is true
        }
    
        @media (min-width: 769px) {
          grid-template-columns: ${({ showPassword }) =>
            showPassword ? "1fr 1fr" : "2fr 1fr"}; // Set to two columns for larger screens
          grid-template-rows: auto; // Reset to one row on larger screens
        }
        input {
          color: black;
          background-color:white;
          border: none;
          padding: 0.8rem;
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