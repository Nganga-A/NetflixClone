import React, { useState } from 'react'
import Navbar from '../components/Navbar';

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

