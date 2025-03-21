const {Schema, model } = require('mongoose');

const DocenteSchema = Schema({
    nombres: {
        type: String,
        required: [true, 'Los nombres son obligatorios']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios']
    },
    dni: {
        type: String,
        required: [true, 'El dni es obligatorio']
    },
    correo: {
        type: String,
        unique: true,
    },
    celular : {
        type: String,
    },
    fecha_nacimiento: {
        type: Date,
    },
    direccion: {
        type: String,
    },
    fecha_contratacion: {
        type: Date,
    },
    fecha_retiro: {
        type: Date,
    },
    observacion: {
        type: String,
    },
    estado: {
        type: String,
        enum: ['ACTIVO', 'INACTIVO', 'RETIRADO'],
        default: 'ACTIVO',
        required: [true, 'El estado es obligatorio'],
    },
},{ collection: 'docente', timestamps: true, versionKey: false });

module.exports = model('Docente', DocenteSchema);