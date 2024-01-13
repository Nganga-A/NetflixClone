import React from "react";
import { useLocation } from "react-router-dom";

export default function NotAvailable() {

  const location = useLocation();
  const isMoviesPage = location.pathname === "/movies";

  return (
    <h2 className="not-available"> 
    {isMoviesPage ?
      "No Movies available for the selected genre. Please select a different genre." 
      : "No TV shows available for the selected genre. Please select a different genre."}
    </h2> 
  );
}