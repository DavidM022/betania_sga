const {Schema, model } = require('mongoose');

const PrestamoLibroSchema = Schema({
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
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: [true, 'El libro es obligatorio']
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
        enum: ['PRESTADO', 'DEVUELTO', 'DEBE'],
        default: 'PRESTADO',
    },
    observaciones: {
        type: String,
    },

},{ collection: 'prestamo_libros', timestamps: true, versionKey: false });

module.exports = model('PrestamoLibros', PrestamoLibroSchema);