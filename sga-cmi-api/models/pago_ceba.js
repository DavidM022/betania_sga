const {Schema, model } = require('mongoose');

const ConceptoSchema = Schema({
    value: String,
    label: String,
    articulo: Boolean,
});

const PagoSchema = Schema({
    codigo: {
        type: String,
        required: [true, 'EL codigo es obligarorio']
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Estudiante_CEBA',
        required: [true, 'El estudiante es obligatorio']
    },
    concepto: [ConceptoSchema],
    meses:{
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

},{ collection: 'pago_ceba', timestamps: true, versionKey: false });

module.exports = model('Pago_CEBA', PagoSchema);