"use client"

import styles from '../styles/QuizCreatorInfo.module.css';
import React, {useEffect, useState} from "react";
import Image from 'next/image';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {OutlinedInput, Switch} from "@mui/material";
import {useRequestService} from "@/service/request.service";
import MultipleSelectCheckmarks from "@/components/MultipleSelectCheckmarks";

const QuizCreatorInfo = () => {

    const [privacy, setPrivacy] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [labels, setLabels] = useState([]);
    const service = useRequestService()

    useEffect(() => {
        service.getLabels().then((response) => {
            // console.log(response)
            setLabels(response)
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    function changePrivacy(event) {
        setPrivacy(!privacy);
    }

    function handleTitle(event) {
        setTitle(event.target.value)
    }

    function handleDescription(event) {
        setDescription(event.target.value)
        event.target.style.height = '22px'
        event.target.style.height = (event.target.scrollHeight + 1) + 'px'
    }

    const handleTagChange = (event) => {
        setSelectedLabels(event.target.value)
    };

    return (
        <div className={styles.componentBox}>
            <div className={styles.titleText}>Nuevo quiz</div>
            <div className={styles.labelsContainer}>

                <div className={styles.labelsInterior}>
                    <label htmlFor="title" className={styles.labelTitle}>Título *</label>
                    <input type="text" id="title" name="title" className={styles.inputText}
                           placeholder="Agrega un título..." onChange={handleTitle}/>
                    <div className={styles.line}/>
                </div>

                <div className={styles.labelsInterior}>
                    <label htmlFor="title" className={styles.labelTitle}>Etiquetas *</label>
                    <Select
                        id="labels"
                        multiple
                        className={styles.inputTag}
                        value={selectedLabels}
                        onChange={handleTagChange}
                        variant="standard"
                    >
                        {labels?.map((label) => (
                            <MenuItem key={label.id}  value={label.value}>
                                {label.value}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div className={styles.labelsInterior}>
                    <label htmlFor="title" className={styles.labelTitle}>Descripción *</label>
                    <textarea type="text" id="description" name="description" className={styles.textAreaInput}
                              placeholder="Agrega una descripción..." onChange={handleDescription}/>
                    <div className={styles.line}/>
                </div>

                <div className={styles.labelsInterior}>
                    <label htmlFor="title" className={styles.labelTitle}>Visibilidad</label>
                    <div className={styles.privateContainer}>
                        <p className={styles.text}>Privado</p>
                        {privacy ? <Image src="/assets/images/activeSwitch.png" alt={""} width={"34"} height={"18"}
                                          onClick={changePrivacy}/>
                            : <Image src="/assets/images/notActiveSwitch.png" alt={""} width={"34"} height={"18"}
                                     onClick={changePrivacy}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default QuizCreatorInfo;