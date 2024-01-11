import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";


export default function SelectGenre({ genres, type }) {

    const dispatch = useDispatch();

    // Render a dropdown select element for genres
    return (
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
    );
}

const Select = styled.select`
    margin-left: 5rem;
    cursor: pointer;
    font-size: 1.4rem;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
`;
