import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";

export default React.memo(function CardSlider({ data, title }) {
    const listRef = useRef();
    const [sliderPosition, setSliderPosition] = useState(0);
    const [showControls, setShowControls] = useState(false);

    // Calculate the maximum slider position based on the length of the data array
    const maxSliderPosition = data.length - 1;

    const handleDirection = (direction) => {
        // Calculate the maximum and minimum slider positions
        const maxSliderPosition = data.length - 1;
        const minSliderPosition = 0;
    
        // Calculate the new slider position based on the direction
        let newSliderPosition =
            direction === "left" ? sliderPosition - 1 : sliderPosition + 1;
    
        // Apply loop behavior if at the last card and moving to the right
        if (newSliderPosition > maxSliderPosition) {
            newSliderPosition = 0;
        }
    
        // Apply loop behavior if at the first card and moving to the left
        if (newSliderPosition < minSliderPosition) {
            newSliderPosition = maxSliderPosition;
        }
    
        // Calculate the new distance based on the new position
        const distance = -(230 * newSliderPosition) + (newSliderPosition === 0 ? 0 : 10);
    
        // Apply the translation using transform style
        listRef.current.style.transform = `translateX(${distance}px)`;
    
        // Update the slider position
        setSliderPosition(newSliderPosition);
    };
    

    

    return (
        <Container
            className="flex column"
            showControls={showControls}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <h1>{title}</h1>
            <div className="wrapper">
                {/* Left navigation control */}
                <div
                    className={`slider-action left ${!showControls ? "none" : ""} flex j-center a-center`}
                >
                    <AiOutlineLeft onClick={() => handleDirection("left")} />
                </div>

                {/* Slider content */}
                <div className="slider flex" ref={listRef}>
                    {data.map((movie, index) => (
                        <Card movieData={movie} index={index} key={movie.id} />
                    ))}
                </div>

                {/* Right navigation control */}
                <div
                    className={`slider-action right ${!showControls ? "none" : ""} flex j-center a-center`}
                >
                    <AiOutlineRight onClick={() => handleDirection("right")} />
                </div>
            </div>
        </Container>
    );
});

const Container = styled.div`
    gap: 1rem;
    position: relative;
    padding: 2rem 0;
    h1 {
        margin-left: 50px;
    }
    .wrapper {
        .slider {
            width: max-content;
            gap: 1rem;
            transform: translateX(0px);
            transition: 0.3s ease-in-out;
            margin-left: 50px;
        }
        .slider-action {
            position: absolute;
            z-index: 99;
            height: 100%;
            top: 0;
            bottom: 0;
            width: 50px;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            svg {
                font-size: 2rem;
            }
        }
        .none {
            display: none;
        }
        .left {
            left: 0;
        }
        .right {
            right: 0;
        }
    }
`;