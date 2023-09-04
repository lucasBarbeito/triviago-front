"use client"

import styles from '../styles/QuizCreatorInfo.module.css';
import {useEffect, useState} from "react";
import Image from 'next/image';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {Switch} from "@mui/material";

const QuizCreatorInfo = () => {

    const tags = [
        'Etiqueta#1',
        'Etiqueta#2',
        'Etiqueta#3',
        'Etiqueta#4',
        'Etiqueta#5',
        'Etiqueta#6',
        'Etiqueta#7',
        'Etiqueta#8',
        'Etiqueta#9',
        'Etiqueta#10',
    ];

    const [privacy, setPrivacy] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription]  = useState("");
    const [tagName, setTagName] = useState([]);

    function changePrivacy(event) {
        setPrivacy(!privacy);
    }
    function handleTitle(event){
        setTitle(event.target.value)
    }
    function handleDescription(event){
        setDescription(event.target.value)
        event.target.style.height = 'auto'
        event.target.style.height = (event.target.scrollHeight + 5)+'px'
    }
    const handleTag = (event) => {
        const { target: { value },} = event;
        setTagName(typeof value === 'string' ? value.split(',') : value,);
    };

    return(
        <div className={styles.componentBox}>
            <div className={styles.titleText}>Nuevo quiz</div>
            <div className={styles.labelsContainer}>

                <div className={styles.labelsInterior}>
                    <label htmlFor="title" className={styles.labelTitle}>Título</label>
                    <input type="text" id="title" name="title" className={styles.inputText} placeholder="Agrega un título..." onChange={handleTitle}/>
                    <div className={styles.line}/>
                </div>

                <div className={styles.labelsInterior}>
                    <label htmlFor="title" className={styles.labelTitle}>Etiquetas</label>
                    <Select
                        id="tags"
                        multiple
                        className ={styles.inputTag}
                        value={tagName}
                        onChange={handleTag}
                        variant="standard"
                    >
                        {tags.map((tag) => (
                            <MenuItem key={tag} value={String(tag)}>
                                {tag}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div className={styles.labelsInterior}>
                    <label htmlFor="title" className={styles.labelTitle}>Descripción</label>
                    <textarea type="text" id="description" name="description" className={styles.textAreaInput} placeholder="Agrega una descripción..." onChange={handleDescription}/>
                    <div className={styles.line}/>
                </div>

                <div className={styles.labelsInterior}>
                    <label htmlFor="title" className={styles.labelTitle}>Visibilidad</label>
                    <div className={styles.privateContainer}>
                        <p className={styles.text}>Privado</p>
                        {privacy ? <Image src="/assets/images/activeSwitch.png" alt={""} width={"34"} height={"18"} onClick={changePrivacy}/>
                                : <Image src="/assets/images/notActiveSwitch.png" alt={""} width={"34"} height={"18"} onClick={changePrivacy}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default QuizCreatorInfo;