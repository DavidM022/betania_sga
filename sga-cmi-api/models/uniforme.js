const {Schema, model } = require('mongoose');

const UniformeSchema = Schema({
    articulo: {
        type: String,
        required: [true, 'El nombre del articulo es obligatorio'],
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
        default: 0,
    },
    precio: {
        type: Number,
        default: 0,
    },
    talla: {
        type: String,
        enum : ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        default: 'M',
    },
    caracteristicas: {
        type: String,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'CategoriaUniforme',
        default: null,
        required: [true, 'El categoria es obligatorio'],
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
}, { collection: 'uniforme', timestamps: true, versionKey: false });

module.exports = model('Uniforme', UniformeSchema);