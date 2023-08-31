import axios from "axios";

const url = "http://localhost:8080"

const RequestService = {

    findById: async (quizId) => {
        const response = await axios.get(`${url}/quiz/${quizId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Hubo un error en la búsqueda de quizzes, por favor intenta más tarde")
        }
    }

}

export const useRequestService = () => RequestService