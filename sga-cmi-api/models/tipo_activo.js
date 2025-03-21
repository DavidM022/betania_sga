const { Schema, model } = require('mongoose');

const TipoActivoSchema = Schema({
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
}, { collection: 'tipo_activo', timestamps: true, versionKey: false });

module.exports = model('TipoActivo', TipoActivoSchema);