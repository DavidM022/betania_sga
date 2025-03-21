const {Schema, model } = require('mongoose');

const InmobiliarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    codigo: {
        type: String,
        required: [true, 'El codigo es obligatorio'],
    },
    descripcion: {
        type: String,
    },
    cantidad: {
        type: Number,
    },
    grado: {
        type: Schema.Types.ObjectId,
        ref: 'Grado',
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    observaciones: {
        type: String,
    },
}, { collection: 'inmobiliario', timestamps: true, versionKey: false });

module.exports = model('Inmobiliario', InmobiliarioSchema);