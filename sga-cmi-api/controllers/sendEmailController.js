const nodemailer = require('nodemailer');
const fs = require('fs');
const { emailConfig } = require('../helpers/emailSend');

const transporter = nodemailer.createTransport(emailConfig);

exports.sendEmailWithAttachment = async (req, res) => {
    try {
        const { to, subject, html } = req.body;
        // const { path, filename } = req.file;

        const mailOptions = {
            from: process.env.EMAIL_SEND,
            to,
            subject,
            html,
            // attachments: [
            //     {
            //         filename,
            //         path,
            //     },
            // ],
        };

        await transporter.sendMail(mailOptions);

         // Eliminar el archivo adjunto después de enviar el correo
        // fs.unlinkSync(path);

        res.status(200).json({ msg: 'Correo electrónico enviado con éxito' });
        
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).json({ msg: 'Error al enviar el correo electrónico' });
    }
};
