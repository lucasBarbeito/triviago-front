'use client'
import React from 'react';
import style from '@/styles/Tab.module.css';

const Tab = ({name, isActive, onClick}) => {

    return (
        <div className={isActive ? style.activeTab : style.tab} onClick={onClick}>
            {name}
        </div>

    )
}

export default Tab;