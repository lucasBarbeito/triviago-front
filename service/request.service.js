import axios from "axios";
import {error} from "next/dist/build/output/log";

const url = "http://localhost:8080"

const RequestService = {

    signUp: async(quizFilter) => {
        const response = await axios.post(`${url}/auth/signup`, quizFilter )

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

    findPublicQuiz: async (quizFilter) => {
        console.log(quizFilter)
        console.log(localStorage.getItem("token"))
        try {
            const response = await axios.get(`${url}/quiz`, quizFilter, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log("error", error)
        }
    },


}

export const useRequestService = () => RequestService
