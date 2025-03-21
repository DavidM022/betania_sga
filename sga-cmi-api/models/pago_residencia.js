const {Schema, model } = require('mongoose');

const PagoSchema = Schema({
    codigo: {
        type: String,
        required: [true, 'EL codigo es obligarorio']
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Estudiante_RESIDENCIA',
        required: [true, 'El estudiante es obligatorio']
    },
    concepto: {
        type: String,
    },
    meses: {
        type: [String],
    },
    anio: {
        type: String,
        required: [true, 'El año es obligatorio'],
    },
    importe: {
        type: Number,
        required: [true, 'El importe es obligatorio'],
    },
    metodo_pago: {
        type: String,
        default: 'EFECTIVO',
    },
    descripcion: {
        type: String,
    },
    estado: {
        type: String,
        enum: ['PENDIENTE', 'CANCELADO'],
        default: 'PENDIENTE',
        required: [true, 'El estado es obligatorio'],
    },
    observaciones: {
        type: String,
    },
},{ collection: 'pago_residencia', timestamps: true, versionKey: false });

module.exports = model('Pago_RESIDENCIA', PagoSchema);