const express = require('express');
const app = express();
const ThermalPrinter = require('node-thermal-printer');

app.post('/print', (req, res) => {
    const printData = req.body;

    // Configura la impresora térmica
    const printer = new ThermalPrinter();
    printer.init({
        type: 'epson', // Especifica el tipo de impresora térmica que estás utilizando
        interface: 'tcp://192.168.0.100', // Especifica la dirección IP o la URL de la impresora térmica
    });

    // Configura el contenido a imprimir
    printer.alignCenter();
    printer.printText(printData.text);
    printer.newLine();

    // Imprime el contenido
    printer.execute()
        .then(() => {
            console.log('Impresión exitosa');
            res.send('Impresión exitosa');
        })
        .catch((error) => {
            console.error('Error de impresión:', error);
            res.status(500).send('Error de impresión');
        });
});

app.listen(3000, () => {
    console.log('Servidor backend escuchando en el puerto 3000');
});
