import axios from "axios";
import {error} from "next/dist/build/output/log";

const url = "http://localhost:8080"

const RequestService = {

    findByInvitationCode: async (invitationCode) => {
        console.log(invitationCode)
        console.log(localStorage.getItem("token"))
        try {
            const response = await axios.get(`${url}/quiz/private/${invitationCode}`,{
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.status === 200) {
                const quizData = response.data;
                console.log("Quiz encontrado:", quizData);
                return response.data;
            }
        } catch (error) {
            console.log("error", error)
        }
    },


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
    }

}

export const useRequestService = () => RequestService


