import axios from "axios";
import {error} from "next/dist/build/output/log";

const url = "http://localhost:8080"

const RequestService = {

    findById: async(quizId) => {
        const response = await axios.post(`${url}/quiz/{id}`, quizId )
        if (response.status === 200){
            localStorage.setItem("token", response.data.token)
        } else {
            throw new error(response.data.error)
        }
    }

}

export const useRequestService = () => RequestService