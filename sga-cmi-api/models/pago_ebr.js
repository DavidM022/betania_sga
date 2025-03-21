const { Schema, model } = require('mongoose');

const ConceptoSchema = Schema({
    value: String,
    label: String,
});

const PagoSchema = Schema({
    codigo: {
        type: String,
        unique: true,
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Estudiante',
        required: [true, 'El estudiante es obligatorio'],
        autopopulate: true,
    },
    concepto: [ConceptoSchema],
    uniforme: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Uniforme',
            autopopulate: true,
            required: false,
            default: null,
        }
    ],
    meses: {
        type: [String],
    },
    anio: {
        type: String,
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
    },
    observaciones: {
        type: String,
    },

}, { collection: 'pago_ebr', timestamps: true, versionKey: false });

module.exports = model('Pago_EBR', PagoSchema);