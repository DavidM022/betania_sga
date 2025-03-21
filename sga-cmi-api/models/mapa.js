const { Schema, model } = require('mongoose');

const MapaSchema = Schema({
    codigo : {
        type: String,
        required: [true, 'El codigo es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    grado: {
        type: Schema.Types.ObjectId,
        ref: 'Grado',
        required: false
    },
    cantidad: {
        type: Number,
        default: 1,
    },
    img: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    observaciones: {
        type: String,
    },
    estado: {
        type: String,
        default: 'ACTIVO',
    },
}, { collection: 'mapa', timestamps: true, versionKey: false });

module.exports = model('Mapa', MapaSchema);