const {Schema, model } = require('mongoose');

const PrestamoMapaSchema = Schema({
    codigo: {
        type: String,
        required: [true, 'EL codigo es obligarorio']
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Estudiante',
        required: false,
    },
    docente: {
        type: Schema.Types.ObjectId,
        ref: 'Docente',
        required: false,
    },
    mapa: {
        type: Schema.Types.ObjectId,
        ref: 'Mapa',
        required: [true, 'La mapa es obligatorio']
    },
    fecha_prestamo: {
        type: Date,
        default: Date.now,
    },
    fecha_devolucion: {
        type: Date,
    },
    descripcion_entrega: {
        type: String,
    },
    descripcion_devolucion: {
        type: String,
    },
    estado: {
        type: String,
        enum: ['PRESTADO', 'DEVUELTO'],
        default: 'PRESTADO',
    },
    observaciones: {
        type: String,
    },

},{ collection: 'prestamo_mapas', timestamps: true, versionKey: false });

module.exports = model('PrestamoMapas', PrestamoMapaSchema);