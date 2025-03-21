import axios from 'axios';

const handlePrint = () => {
    const printData = {
        text: '¡Hola, impresora térmica!',
    };

    axios.post('http://localhost:3000/print', printData)
        .then((response) => {
            console.log(response.data);
            // Realiza cualquier acción adicional después de una impresión exitosa
        })
        .catch((error) => {
            console.error('Error de impresión:', error);
            // Maneja el error de impresión
        });
};

export default handlePrint;