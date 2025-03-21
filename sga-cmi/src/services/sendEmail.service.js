import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// Send Email

const sendEmail = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }
    const response = await axios.post(`${baseURL}/email/send`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('CORREO ENVIADO', 'Se le ha enviado el correo al cliente', 'success', 1500, 'top');
        return response.data;
    }
}

const sendEmailService = {
    sendEmail
}

export default sendEmailService;