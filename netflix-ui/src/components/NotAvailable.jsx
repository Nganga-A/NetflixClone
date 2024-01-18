import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function NotAvailable() {

  const location = useLocation();
  const isMoviesPage = location.pathname === "/movies";

  return (
    <NotAvailablediv className="not-available"> 
    {isMoviesPage ?
      "No Movies available for the selected genre. Please select a different genre." 
      : "No TV shows available for the selected genre. Please select a different genre."}
    </NotAvailablediv> 
  );
}

const NotAvailablediv = styled.h3`
    h2 {
      font-size:90%
      text-align:center;
    }
    @media (max-width: 768px) {
      font-size: 0.8rem;
      padding: 0.5rem;
      width: 80%;
      margin: 0 auto;
    }
  }
`;