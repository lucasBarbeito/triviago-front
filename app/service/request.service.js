//Hook (como el de tresh) donde se declaran todos los metodos que hacen las llamadas al back

// JSON que va a tener funciones adentro
import axios from "axios";
import {error} from "next/dist/build/output/log";

const url = "http://localhost:8080"

const RequestService = {

    /*
     * Las function que piden cosas tienen un delay en su respuesta
     * async -> indica que la respuesta es asincronica, promete una respuesta que puede ser el tipo esperado o un error
     * es la respuesta "envuelta en algo" porque no se completo la transaccion
     * await -> se usa si o si en fn asincronicas. "Pausa" el flujo del codigo hasta que se complete la transaccion
     */
    login: async (loginData) => {
        const response = await axios.post(`${url}/auth/login`, loginData )

        if (response.status === 200){
            localStorage.setItem("token", response.data.token)
        } else {
            throw new error(response.data.error)
        }

    }


}

//metodo para llamar a RequestService
export const useRequestService = () => RequestService
