"use client"

import styles from '../styles/QuizCreatorInfo.module.css';
import {useState} from "react";
import Image from 'next/image';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const QuizCreatorInfo = () => {

    const tags = [
        'Tag#1',
        'Tag#2',
        'Tag#3',
        'Tag#4',
        'Tag#5',
        'Tag#6',
        'Tag#7',
        'Tag#8',
        'Tag#9',
        'Tag#10',
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
                    <input type="text" id="title" name="title" className={styles.inputText} placeholder="Agrega una descripción..." onChange={handleDescription}/>
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