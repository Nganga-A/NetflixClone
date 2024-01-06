import React from 'react'
import styled from "styled-components"
import BackgroundImage from "../components/BackgroundImage "
import Header from "../components/Header"

const Container = styled.div

export default function Signup() {
  return (
    <container>
      <BackgroundImage />
      <Header />
      <div className='body flex column a-center j-center'>
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
    </container>
  )
}
