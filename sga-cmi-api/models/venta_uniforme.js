const { Schema, model } = require('mongoose');

const VentaUniformeSchema = Schema({
    codigo: {
        type: String,
        required: [true, 'EL codigo es obligarorio']
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Estudiante_EBR',
        required: [true, 'El estudiante es obligatorio']
    },
    uniforme:
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'Uniforme',
            autopopulate: true,
        },
    ],
    metodo_pago: {
        type: String,
        default: 'EFECTIVO',
    },
    descripcion : {
        type: String,
    },
    monto_pagado: {
        type: Number,
        required: [true, 'El monto es obligatorio'],
    },
    estado: {
        type: String,
        default: 'PENDIENTE',
    },
    fecha_venta : {
        type: Date,
        default: Date.now,
    },
    observaciones: {
        type: String,
    },

},{ collection: 'venta_uniforme', timestamps: true, versionKey: false });

module.exports = model('VentaUniforme', VentaUniformeSchema);