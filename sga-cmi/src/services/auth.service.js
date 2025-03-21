import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// Register user
const register = async (userData) => {

    const response = await axios.post(`${baseURL}/usuarios`, userData);
    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        ToastChakra('Usuario registrado', 'Bienvenido a la plataforma', 'success', 2500);
    }

    return response.data;
}

// Login user
const login = async (userData) => {
    
        const response = await axios.post(`${baseURL}/login`, userData);

        if(response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            ToastChakra('BIENVENIDO A LA PLATAFORMA - SGA', 'CARGANDO LOS DATOS ...', 'loading', 3500);
            return response.data;
        }
    
}

// updated my profile
const updateProfile = async (userData, token) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }

    const response = await axios.put(`${baseURL}/auth/update/${userData._id}`, userData, config);
    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        ToastChakra('Perfil actualizado', 'Los datos se han actualizado correctamente', 'success', 2500);
        return response.data;
    }
}

// reset password

const forgotPassword = async (data) => {
    const response = await axios.post(`${baseURL}/auth/forgot-password`, data);
    if(response.data.ok === true) {
        ToastChakra('CORREO ENVIADO', 'Se ha enviado un correo electrónico', 'success', 2500, 'bottom');
    }
    return response.data;
}

// reset password
const resetPassword = async (data) => {
    const response = await axios.post(`${baseURL}/auth/reset-password`, data);
    if(response.data.ok === true){
        ToastChakra('CONTRASEÑA ACTUALIZADA', 'La contraseña se ha actualizado correctamente', 'success', 2500, 'top');
    }
    return response.data;
}

// const resetPassword = (data) => {
//     return new Promise((resolve, reject) => {
//         axios
//             .post(`${baseURL}/auth/reset-password`, data)
//             .then((response) => {
//                 ToastChakra('CONTRASEÑA ACTUALIZADA', 'La contraseña se ha actualizado correctamente', 'success', 2500, 'top');
//                 resolve(response.data);
//             })
//             .catch((error) => {
//                 console.error(error);
//                 reject(error); // Opcionalmente, puedes rechazar la promesa en caso de error
//             });
//     })
// }

// Logout user
const logout = () => {
    ToastChakra('CERRANDO SESIÓN ...', 'HASTA PRONTO, TE ESPERAMOS!', 'loading', 2000);
    localStorage.removeItem("user");
    // localStorage.removeItem("chakra-ui-color-mode");
    // window.location.reload();
}

const authService = {
    register,
    login,
    updateProfile,
    logout,
    forgotPassword,
    resetPassword
}

export default authService;