import axios from "axios";
import { ToastChakra } from "../helpers/toast";
// import { ToastChakra } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// Get reportes modalidad EBR
const getReportesEBR = async (token) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }

    const response = await axios.get(`${baseURL}/reportes/reporte_hoy`, config);
    return response.data;

}

const getDataBetweenDates = (desde, hasta) => {
    return new Promise((resolve) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                desde,
                hasta,
            },
        };

        axios
            .get(`${baseURL}/reportes/reporte_fechas`, config)
            .then((response) => {
                setTimeout(() => {
                    ToastChakra('Reporte generado','Los datos se han generado correctamente','success',2500, 'top');
                    resolve(response.data);
                }, 1500);
            })
            .catch((error) => {
                // Manejo de errores aquí
                console.error(error);
                resolve(null); // Opcionalmente, puedes rechazar la promesa en caso de error
            });
    });
};


const getAllReportesEBR = async () => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const response = await axios.get(`${baseURL}/reportes/ebr`, config);
    return response.data;

}



const getReportesCEBA = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }
    const response = await axios.get(`${baseURL}/reportes/ceba`, config);
    return response.data;
}

const getReportesRESIDENCIA = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }
    const response = await axios.get(`${baseURL}/reportes/residencia`, config);
    return response.data;
}


const reporteService = {
    getAllReportesEBR,
    getReportesEBR,
    getReportesCEBA,
    getReportesRESIDENCIA,
    getDataBetweenDates
}

export default reporteService;