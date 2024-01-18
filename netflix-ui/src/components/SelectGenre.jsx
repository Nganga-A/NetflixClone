import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const isMoviesPage = location.pathname === "/movies";

  return (
    <Container className="flex">
      <span>{isMoviesPage ? "Movies" : "Tv Shows"} </span>
      <CustomSelect
        onChange={(e) => {
          dispatch(
            fetchDataByGenre({
              genres,
              genre: e.target.value,
              type,
            })
          );
        }}
      >
        {genres.map((genre) => (
          <Option key={genre.id} value={genre.id}>
            {genre.name}
          </Option>
        ))}
      </CustomSelect>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 1.2rem;
    margin-left: 3rem;
    @media (max-width: 767px) { 
      margin-left:1.7rem;
      font-size:1.1rem;
    }
  }
`;

const CustomSelect = styled.select`
  cursor: pointer;
  font-size: 1.2rem;
  background-color: rgba(0, 0, 0, 1);
  color: white;
  padding: 0.1rem;
  border-radius: 4px;
  margin-left: 1rem;

  &:focus {
    outline: none;
  }
  @media (max-width: 767px) { 
    font-size:1.1rem;
  }
`;

const Option = styled.option`
  padding: 1rem;
  display: inline-block;
  box-sizing: border-box;
  height: 5rem;
`;
