import axios from "axios";
import {error} from "next/dist/build/output/log";
import Cookies from "js-cookie";

const url = "http://localhost:8080"

const RequestService = {


    signUp: async(signUpData) => {
        const response = await axios.post(`${url}/auth/signup`, signUpData )

        if(response.status === 200){
            localStorage.setItem("token", response.data.token)
            Cookies.set("jwt", response.data.token, {expires: 7})
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
            Cookies.set("jwt", response.data.token, {expires: 7})
        } else if (response.status=== 400){
            throw new error("Credenciales incorrectas.")
        }else if (response.status=== 401){
            throw new error("Credenciales incorrectas.")
        } else if (response.status=== 500){
            throw new error("Error. Intente mas tarde por favor")
        } else {
            throw new error(response.data.error)
        }

    }


}

export const useRequestService = () => RequestService
