import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import QuizCreatorInfo from "@/components/QuizCreatorInfo";
import React, {useState} from "react";
import axios from "axios";
import API_URL from "@/config";
import { useRouter } from "next/navigation";
import {Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";


const CreationPage = () => {
    const token = localStorage.getItem("token");
    const router = useRouter();
    const [id, setId] = useState();

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const createQuiz = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Token en el header
                },
                body: {
                    "title": "'Quiz 1'",
                    "description": "primer ejemplo de quiz",
                    "userId": "1",
                    "isPrivate": false,
                    "labels": [],
                    "questions": []
                }
            };
            const response = await axios.get(API_URL + "/quiz", config);

            if (response.status === 200) {
                setId(response.data.id);
                router.push(`/${id}/details`)            }
        } catch (error) {
            setMessage('Hubo un error al buscar la información del quiz')
            setOpen(true)
        }
    };
    return (
        <div>
            <ResponsiveAppBar/>
            <br/>
            <QuizCreatorInfo/>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default CreationPage;