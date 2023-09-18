import axios from "axios";
import {error} from "next/dist/build/output/log";
import API_URL from "@/config";

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

    createQuiz: async (quizData) => {

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` // Token en el header
                },
            };
            const response = await axios.post(API_URL + "/quiz", quizData, config);

            if (response.status === 200) {
                // setId(response.data.id);
                // router.push(`/${id}/details`)
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

    getQuizData: async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` // Token en el header
            },
        };
        try {
            const response = await axios.get(API_URL + "/quiz/" + id, config);
            if (response.status === 200) {
                return response
            } else {
                throw new error("Hubo un error al buscar la información del quiz")
            }        }
        catch (error) {
            throw error;
        }
    }


}

export const useRequestService = () => RequestService
