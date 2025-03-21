const { Schema, model } = require('mongoose');

const GradoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
    },
    nivel: {
        type: String,
        required: [true, 'El nivel es obligatorio'],
        enum: ['INICIAL', 'PRIMARIA', 'SECUNDARIA', 'OTRO']
    },
    modalidad: {
        type: String,
        required: [true, 'El modalidad es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
    },
}, { collection: 'grado', timestamps: true, versionKey: false });

module.exports = model('Grado', GradoSchema);