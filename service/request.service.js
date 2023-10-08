import axios from "axios";
import {error} from "next/dist/build/output/log";
import Cookies from "js-cookie";

const url = "http://localhost:8080"

const RequestService = {


    signUp: async (signUpData) => {
        const response = await axios.post(`${url}/auth/signup`, signUpData)

        if (response.status === 200) {
            localStorage.setItem("token", response.data.token)
            Cookies.set("jwt", response.data.token, {expires: 7})
        } else if (response.status === 409) {
            throw new error("Ya existe un usuario con el correo electronico")
        } else {
            throw new error(response.data.error)
        }
    },

    login: async (loginData) => {
        const response = await axios.post(`${url}/auth/login`, loginData)

        if (response.status === 200) {
            localStorage.setItem("token", response.data.token)
            Cookies.set("jwt", response.data.token, {expires: 7})
        } else if (response.status === 400) {
            throw new error("Credenciales incorrectas.")
        } else if (response.status === 401) {
            throw new error("Credenciales incorrectas.")
        } else if (response.status === 500) {
            throw new error("Error. Intente mas tarde por favor")
        } else {
            throw new error(response.data.error)
        }

    },

    fetchComments: async (quizId) => {
        try {
            const response = await axios.get(`${url}/quiz/${quizId}/comment`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + Cookies.get('jwt')
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
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('jwt')
                }
            }
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
                    'Authorization': 'Bearer ' + Cookies.get('jwt')
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
                    'Authorization': 'Bearer ' + Cookies.get('jwt')
                }
            }
        );
        if (response.status === 200) {
            return response.data;
        }
    },

    removeLikeComment: async (commentId) => {
        const response = await axios.delete(
            `${url}/comment/${commentId}/removeLike`,
            {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('jwt')
                }
            }
        );
        if (response.status === 200) {
            return response.data;
        }
    },

    editComment: async (id, newContent) => {
        try {
            const response = await axios.put(
                `${url}/comment/${id}`,
                {newContent: newContent},
                {
                    headers: {
                        'Authorization': 'Bearer ' + Cookies.get('jwt')
                    }
                }
            );

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.error(error);
        }
    },

    deleteComment: async (id) => {
        try {
            const response = await axios.delete(`${url}/comment/${id}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + Cookies.get('jwt')
                    }
                }
            );

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.error(error);
        }
    },

    getLabels: async () => {
        try {
            const response = await axios.get(`${url}/label`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + Cookies.get('jwt')
                    }
                });

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.error(error);
        }

    },

    filterQuizzes: async (quizFilter) => {
        // Codificar los valores de los parámetros en la URL
        const response = await axios.get(
            `${url}/quiz`, {
                params: quizFilter,
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('jwt')
                }
            });

        if (response.status === 200) {
            return response.data;
        }
    },



    rateQuiz: async (quizId, rating) => {
        try {
            console.log("Rating: ", rating)
            console.log("quizId: ", quizId)
            const response = await axios.post(
                `${url}/quiz/${quizId}/rate`,
                { rating },
                {
                    headers: {
                        'Authorization': 'Bearer ' + Cookies.get('jwt'),
                    },
                }
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw new Error("Hubo un error al calificar el quiz, por favor intenta más tarde");
        }
    },

}

export const useRequestService = () => RequestService
