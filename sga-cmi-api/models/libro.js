const {Schema, model } = require('mongoose');

const LibroSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
    },
    codigo: {
        type: String,
        required: [true, 'El codigo es obligatorio'],
    },
    cantidad: {
        type: Number,
    },
    editorial: {
        type: String,
    }, 
    autor: {
        type: String,
    },
    grado: {
        type: Schema.Types.ObjectId,
        ref: 'Grado',
    },
    img: {
        type: String,
    },
    es_obra_literaria: {
        type: Boolean,
        default: false,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    observaciones: {
        type: String,
    },
}, { collection: 'libro', timestamps: true, versionKey: false });

module.exports = model('Libro', LibroSchema);