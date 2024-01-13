import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch} from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";


export default function SelectGenre({ genres, type }) {

    const dispatch = useDispatch();
    const location = useLocation();
    const isMoviesPage = location.pathname === "/movies";

    // Render a dropdown select element for genres
    return (
        <Container className="flex">
        <span>{isMoviesPage ? "Movies" : "Tv Shows"} </span>
        <Select
            className="flex"
            onChange={(e) => {
                // Dispatch an action to fetch data based on the selected genre
                dispatch(
                    fetchDataByGenre({
                        genres,
                        genre: e.target.value,
                        type,
                    })
                );
            }}
        >
            {/* Map through genres and render an option for each */}
            {genres.map((genre) => {
                return (
                    <option value={genre.id} key={genre.id}>
                        {genre.name}
                    </option>
                );
            })}
        </Select>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    span {
        font-size:1.2rem;
        margin-left:3rem;
    }
`;

const Select = styled.select`
    margin-left: 1rem;
    cursor: pointer;
    font-size: 1.2rem;
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
`;
