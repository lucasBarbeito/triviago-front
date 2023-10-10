'use client'
import React from 'react';

const UserAvatarIcon = ({width, height}) => {

    return (
        <svg width={width??'128'} height={height??'128'} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="User icon" clip-path="url(#clip0_123_1260)">
                <path id="Vector" d="M62.7448 67.7647C73.8381 67.7647 82.8232 58.7796 82.8232 47.6863C82.8232 36.5929 73.8381 27.6078 62.7448 27.6078C51.6514 27.6078 42.6663 36.5929 42.6663 47.6863C42.6663 58.7796 51.6514 67.7647 62.7448 67.7647ZM62.7448 77.8039C49.3424 77.8039 22.5879 84.5302 22.5879 97.8824V107.922H102.902V97.8824C102.902 84.5302 76.1471 77.8039 62.7448 77.8039Z" fill="#D0D5DD"/>
                <path id="Polygon 1" d="M62.745 125.49L96.1626 115.952L107.921 104.157H18.8232L29.3275 115.952L62.745 125.49Z" fill="#D0D5DD"/>
                <circle id="Ellipse 1" cx="62.7451" cy="67.7647" r="59.2353" stroke="#D0D5DD" stroke-width="2"/>
            </g>
            <defs>
                <clipPath id="clip0_123_1260">
                    <rect width="128" height="128" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );

}

export default UserAvatarIcon;