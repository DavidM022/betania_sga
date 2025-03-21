const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { emailConfig } = require('../helpers/emailSend');
const moment = require('moment');

const login = async (req, res = response) => {

    try {

        const { correo, password } = req.body;

        const usuarioDB = await Usuario.findOne({ correo });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }

        // verificiar si el usuario está activo o no

        if (!usuarioDB.estado) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario Inactivo, Hable con el administrador'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: 'login',
            usuario: {
                id: usuarioDB._id,
                nombre: usuarioDB.nombre,
                correo: usuarioDB.correo,
                password: usuarioDB.password,
                img: usuarioDB.img,
                brand_color: usuarioDB.brand_color,
                rol: usuarioDB.rol
            },
            menu: getMenuFrontEnd(usuarioDB.rol),
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const register = async (req, res = response) => {

    const { correo, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ correo });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const data = {
            nombre,
            correo,
            password,
        }

        const usuario = new Usuario(data);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar usuario
        const usuarioData = await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.uid);

        res.json({
            ok: true,
            usuario: usuarioData,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

// update my profile
const updateProfile = async (req, res = response) => {

    const id = req.params.id;

    try {

        const { password, modalidad, correo, ...data } = req.body;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        if (usuario.correo !== correo) {
            const existeEmail = await Usuario.findOne({ correo });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese correo'
                });
            }

            data.correo = correo;

        }

        function comparePassword(password, usuario) {
            return bcrypt.compareSync(password, usuario);
        }

        if (password !== undefined) {
            if (comparePassword(password, usuario.password) === false) {
                if (usuario.password !== password) {
                    const salt = bcrypt.genSaltSync();
                    data.password = bcrypt.hashSync(password, salt);
                } else {
                    data.password = password;
                }
            }
        } else {
            data.password = usuario.password;
        }

        const usuarioData = await Usuario.findByIdAndUpdate(id, data, { new: true });

        const token = await generarJWT(id);

        res.json({
            ok: true,
            msg: 'Perfil Actualizado',
            usuario: {
                id: usuarioData._id,
                nombre: usuarioData.nombre,
                correo: usuarioData.correo,
                password: usuarioData.password,
                img: usuarioData.img,
                brand_color: usuarioData.brand_color,
                rol: usuarioData.rol
            },
            menu: getMenuFrontEnd(usuarioData.rol),
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

let codigosRecuperacion = {
    codigo: null,
    fechaEnvidada: null,
};

const obtenerFechaActualFormateada = () => {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript se indexan desde 0
    const day = String(fecha.getDate()).padStart(2, '0');
    const hour = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');
    const fechaFormateada = `${year}/${month}/${day} ${hour}:${minutes} GMT`;
    return fechaFormateada;
};

function generateEmailHTML(userData, ipAddress, codigoRecuperacion) {
    return `
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Recuperación de contraseña - SGA-MI</title>
        <style>
                /* Estilos CSS personalizados */
            body {
                font-family: Roboto,Arial,Helvetica,sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f5f6f7;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #f1f2f5;
                border-radius: 10px;
            }
            .header {
                display: block;
                text-align: center;
                font-size: 16px;
                font-weight: bold;
                color: white;
                padding: 10px 0;
                background-color: #6b46c1;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
            .content {
                padding: 20px;
                text-align: justify;
            }
            .content p {
                margin-bottom: 10px;
                font-size: 14px;
                font-weight: 400;
                line-height: 24px;
                color: #131313;
            }
            .footer {
                display: block;
                text-align: center;
                font-size: 14px;
                font-weight: 400;
                color: #1a202c;
                padding: 10px 0;
                margin: 0;
                background-color: #f6f8fc;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
            }
            .verification-code p{
                text-align: center;
                font-size: 35px;
                font-weight: bold;
                margin: 20px 0;
            }
            .more_details p{
                text-align: center;
                font-size: 14px;
            }
        </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h3>Recuperación de Contraseña</h3>
                </div>
                <div class="content">
                    <p>Hola, <strong>${userData?.nombre};</strong></p>
                    <p>Recientemente solicitaste un cambio de contraseña para tu cuenta de Sistema de Gestión Administrativa.</p>
                <div class="verification-code">
                    <p>${codigoRecuperacion}</p>
                    <p style="text-align:center; font-size: 12px; font-weight: 400">Código, válido solo por 2 minutos</p>
                </div>
                <div class="more_details">
                    <p><strong>IP Address:</strong> ${ipAddress}</p>
                    <p><strong>Fecha:</strong> ${obtenerFechaActualFormateada()}</p>
                </div>
            </div>
            <div class="footer">
                <p>© ${new Date().getFullYear()} SGA</p>
                <p>Zona Pto. Mejillones - Av. Franz Tamayo | Bolivia</p>
            </div>
        </body>
    </html>
`;
}


const obtenerDireccionIP = async () => {
    try {
        const response = await fetch('https://api.ipify.org/?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error al obtener la dirección IP:', error);
        return null;
    }
};

const recuperarContrasena = async (req, res) => {
    try {
        // Obtener el correo electrónico del cuerpo de la solicitud
        const { correo } = req.body;

        // Verificar si el correo electrónico existe en la base de datos y obtener el usuario correspondiente
        const usuarioDB = await Usuario.findOne({ correo });

        if (!usuarioDB) {
            return res.json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Generar el código de recuperación
        const codigoRecuperacion = await generarCodigoRecuperacion();

        // Guardar el código de recuperación temporalmente
        codigosRecuperacion.codigo = codigoRecuperacion;
        codigosRecuperacion.fechaEnvidada = new Date();

        // Obtener la dirección IP
        const ipAddress = await obtenerDireccionIP();

        const transporter = nodemailer.createTransport(emailConfig);

        // Configurar el contenido del correo electrónico
        const mailOptions = {
            from: process.env.EMAIL_SEND,
            to: correo,
            subject: 'Código de validación para Recuperación de contraseña',
            html: generateEmailHTML(usuarioDB, ipAddress, codigoRecuperacion)
        };

        // Generar el TOKEN - JWT
        const token = await generarJWT(correo);

        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.json({
                    ok: false,
                    msg: 'Error al enviar el correo electrónico'
                });
            } else {
                res.json({
                    ok: true,
                    msg: 'Correo electrónico enviado',
                    correo,
                    emailToken: token,
                    response: info.response,
                });
            }
        });
    } catch (error) {
        console.error('Error al recuperar la contraseña:', error);
        res.json({
            ok: false,
            msg: 'Error al recuperar la contraseña'
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        // Obtener el correo electrónico, el código de recuperación y la nueva contraseña del cuerpo de la solicitud
        const { correo, codigoRecuperacion, newPassword } = req.body;

        // Verificar si el correo electrónico existe en la base de datos y obtener el usuario correspondiente
        const usuarioDB = await Usuario.findOne({ correo });

        if (!usuarioDB) {
            return res.json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar si existe un código de recuperación válido para el correo electrónico

        if (codigoRecuperacion !== codigosRecuperacion.codigo) {
            return res.json({
                ok: false,
                msg: 'Código de recuperación inválido'
            });
        }

        //validar si expiró la fecha usando 'moment'

        const fechaEnvidada = moment(codigosRecuperacion.fechaEnvidada);
        const fechaActual = moment(new Date());
        const difFechas = fechaActual.diff(fechaEnvidada, 'minutes');

        if (difFechas > 2) {
            return res.json({
                ok: false,
                msg: 'Código de recuperación ha expirado, intente de nuevo'
            });
        }

        // Encriptar la nueva contraseña
        const salt = bcrypt.genSaltSync();
        const passwordEncriptado = bcrypt.hashSync(newPassword, salt);

        // Guardar la nueva contraseña en la base de datos
        usuarioDB.password = passwordEncriptado;
        await usuarioDB.save();

        // Enviar la respuesta
        res.json({
            ok: true,
            msg: 'Contraseña actualizada',
        });

    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la contraseña'
        });
    }
}


const generarCodigoRecuperacion = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(3, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                const codigo = buffer.toString('hex').toUpperCase();
                resolve(codigo);
            }
        });
    });
};

const renewToken = async (req, res = response) => {

    const id = req.id;

    // Generar el TOKEN - JWT
    const token = await generarJWT(id);

    // Obtener el usuario por id
    const usuario = await Usuario.findById(id);

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontEnd(usuario.role)
    });

}

module.exports = {
    login,
    register,
    updateProfile,
    renewToken,
    recuperarContrasena,
    resetPassword
}