const { Schema, model } = require('mongoose');

const LaboratorioSchema = Schema({
    codigo: {
        type: String,
        required: [true, 'El codigo es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    modelo: {
        type: String,
    },
    marca: {
        type: String,
    },
    color: {
        type: String,
    },
    accesorios: {
        type: String,
    },
    condicion: {
        type: String,
        default: 'NUEVO',
    },
    cantidad: {
        type: Number,
    },
    fecha_ingreso: {
        type: Date,
    },
    descripcion: {
        type: String,
    },
    ubicacion: {
        type: String,
    },
    responsable: {
        type: String,
    },
    fecha_anulacion: {
        type: Date,
    },
    img: {
        type: String,
    },
    observaciones: {
        type: String,
    },
    estado: {
        type: String,
        default: 'ACTIVO',
    },
}, { collection: 'laboratorio', timestamps: true, versionKey: false });

module.exports = model('Laboratorio', LaboratorioSchema);