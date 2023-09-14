import axios from "axios";
import {error} from "next/dist/build/output/log";

const url = "http://localhost:8080"

const RequestService = {


    signUp: async(signUpData) => {
        const response = await axios.post(`${url}/auth/signup`, signUpData )

        if(response.status === 200){
            localStorage.setItem("token", response.data.token)
        } else if(response.status === 409){
            throw new error("Ya existe un usuario con el correo electronico")
        } else {
            throw new error(response.data.error)
        }
    },

    login: async (loginData) => {
        const response = await axios.post(`${url}/auth/login`, loginData )

        if (response.status === 200){
            localStorage.setItem("token", response.data.token)
        } else if (response.status=== 400){
            throw new error("Credenciales incorrectas.")
        }else if (response.status=== 401){
            throw new error("Credenciales incorrectas.")
        } else if (response.status=== 500){
            throw new error("Error. Intente mas tarde porfis")
        } else {
            throw new error(response.data.error)
        }

    },

    fetchComments : async (quizId) => {
        try {
            const response = await axios.get(`${url}/quiz/${quizId}/comment`,
            {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (response.status === 200) {
                return response.data        // devuelve la lista de comentarios
            }
        } catch (error) {
            console.error('Error al obtener los comentarios:', error);
        }
    },

    logComment: async (commentContent) => {
            const response = await axios.post(`${url}/comment`, commentContent,
            {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }}
            );

            if (response.status === 200) {
                return response.data
            }
    },

    likeComment: async (commentId) => {

            const response = await axios.post(
                `${url}/comment/${commentId}/like`,
                {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
            );
            if (response.status === 200) {
                return response.data;
            }

    },

    dislikeComment: async (commentId) => {
            const response = await axios.post(
                `${url}/comment/${commentId}/dislike`,
                {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
            );
            if (response.status === 200) {
                return response.data;
            }
    }






}

export const useRequestService = () => RequestService
