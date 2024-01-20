import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";

export default React.memo(function CardSlider({ data, title }) {
    const listRef = useRef();
    const [sliderPosition, setSliderPosition] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);
    const [controlsVisible, setControlsVisible] = useState(false);

    // Calculate the maximum slider position based on the length of the data array
    const maxSliderPosition = data.length - 1;

    const handleDirection = (direction) => {
        // Calculate the maximum and minimum slider positions
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

    const handleSwipe = (deltaX) => {
        const sensitivity = 150;

        if (deltaX > sensitivity) {
            handleDirection("left");
        } else if (deltaX < -sensitivity) {
            handleDirection("right");
        }
    };

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (touchStartX !== null) {
            const touchEndX = e.touches[0].clientX;
            const deltaX = touchEndX - touchStartX;

            if (Math.abs(deltaX) > 10) {
                handleSwipe(deltaX);
                setTouchStartX(null);
            }
        }
    };

    const isSmallScreen = window.innerWidth <= 767;

    return (
        <Container
            className="flex column"
            showControls={controlsVisible}
            onMouseEnter={() => setControlsVisible(true)}
            onMouseLeave={() => setControlsVisible(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <h2>{title}</h2>
            <div className={`wrapper ${isSmallScreen ? "swipe-enabled" : ""}`}>
                {/* Left navigation control */}
                {!isSmallScreen && (
                    <div
                        className={`slider-action left ${!controlsVisible ? "none" : ""} flex j-center a-center`}
                    >
                        <AiOutlineLeft onClick={() => handleDirection("left")} />
                    </div>
                )}

                {/* Slider content */}
                <div className={`slider flex`} ref={listRef}>
                    {data.map((movie, index) => (
                        <Card movieData={movie} index={index} key={movie.id} />
                    ))}
                </div>

                {/* Right navigation control */}
                {!isSmallScreen && (
                    <div
                        className={`slider-action right ${!controlsVisible ? "none" : ""} flex j-center a-center`}
                    >
                        <AiOutlineRight onClick={() => handleDirection("right")} />
                    </div>
                )}
            </div>
        </Container>
    );
});

const Container = styled.div`
    gap: 1rem;
    position: relative;
    padding: 2rem 0;

    @media (max-width: 767px) {
        gap: 0.5rem;
        padding: 0.5rem 0;
    }

    h2 {
        margin-left: 50px;
        font-size: 160%;
        @media (max-width: 767px) {
            margin-left: 25px;
            font-size: 115%;
        }
    }

    .wrapper {
        .slider {
            width: max-content;
            gap: 1rem;
            transform: translateX(0px);
            transition: 0.3s ease-in-out;
            margin-left: 50px;
            @media (max-width: 767px) {
                gap: 0.6rem;
                margin-left: 25px;
            }
        }

        .slider-action {
            position: absolute;
            z-index: 1;
            height: 100%;
            top: 0;
            bottom: 0;
            width: 50px;
            cursor: pointer;
            transition: 0.3s ease-in-out;

            svg {
                font-size: 2rem;
            }

            @media (max-width: 767px) {
                display: none; // Hide arrow controls on small screens
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

    .swipe-enabled {
        overflow: hidden;
        touch-action: pan-y;
        user-select: none;
        cursor: grab;

        &:active {
            cursor: grabbing;
        }
    }
`;
