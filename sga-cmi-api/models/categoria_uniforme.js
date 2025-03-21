const { Schema, model } = require('mongoose');

const CategoriaUniformeSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
    },
}, { collection: 'categoria_uniforme', timestamps: true, versionKey: false });

module.exports = model('CategoriaUniforme', CategoriaUniformeSchema);