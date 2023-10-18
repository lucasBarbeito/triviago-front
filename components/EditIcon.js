'use client'
import React from 'react';

const EditIcon = ({width, height}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width??'24'} height={height??'24'} viewBox="0 0 24 24" fill="none">
        <g clip-path="url(#clip0_377_858)">
            <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="#667085"/>
        </g>
        <defs>
            <clipPath id="clip0_377_858">
                <rect width="24" height="24" fill="white"/>
            </clipPath>
        </defs>
    </svg>
    );

}

export default EditIcon