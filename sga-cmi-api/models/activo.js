const {Schema, model, default: mongoose } = require('mongoose');

const ActivoSchema = Schema({
    codigo: {
        type: String,
        unique: true,
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    tipo_activo: {
        type: Schema.Types.ObjectId,
        ref: 'TipoActivo',
        required: [true, 'El tipo de activo es obligatorio']
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
    procesador: {
        type: String,
    },
    ram: {
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
    fecha_compra: {
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
    },
}, { collection: 'activo', timestamps: true, versionKey: false });

module.exports = model('Activo', ActivoSchema);