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

    createQuiz: async (quizData) => {
            console.log(quizData)
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` // Token en el header
                },
            };
            console.log('aca')
            const response = await axios.post(API_URL + "/quiz", quizData, config);
            console.log(response)
            if (response.status === 200) {
                return response;
            }
            else throw new error()
                // setId(response.data.id);
                // router.push(`/${id}/details`)
    },

    getLabels: async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` // Token en el header
            },
        };
        const response = await axios.get(API_URL + "/label", config);
        if (response.status === 200) {
            return response;
        }
        else throw new error()
    }



}

export const useRequestService = () => RequestService
