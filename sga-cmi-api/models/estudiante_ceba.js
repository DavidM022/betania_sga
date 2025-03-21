const {Schema, model } = require('mongoose');

const EstudianteCebaSchema = Schema({
    nombres: {
        type: String,
        required: [true, 'Los nombres son obligatorios']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios']
    },
    dni: {
        type: String,
        required: [true, 'El dni es obligatorio']
    },
    sexo: {
        type: String,
        emun: ['M', 'F'],
        default: 'M',
        required: [true, 'El sexo es obligatorio']
    },
    correo: {
        type: String,
    },
    celular : {
        type: String,
    },
    domicilio: {
        type: String,
    },
    fecha_nacimiento: {
        type: Date,
    },
    nombre_padres: {
        type: String,
    },
    celular_padres: {
        type: String,
    },
    correo_padres: {
        type: String,
    },
    colegio_procedencia: {
        type: String,
    },
    tipo_estudiante: {
        type: String,
        enum: ['RESIDENCIA', 'EXTERNA', 'OTRO'],
        required: [true, 'El tipo de estudiante es obligatorio'],
    },
    modalidad: {
        type: String,
        enum: ['PRESENCIAL', 'VIRTUAL', 'PERIFERICO'],
        required: [true, 'La modalidad es obligatoria'],
    },
    ubicacion_periferico: {
        type: String,
        required: false,
    },
    grado: {
        type: Schema.Types.ObjectId,
        ref: 'Grado',
        required: false,
    },
    img: {
        type: String,
    },
    observaciones: {
        type: String,
    },
    estado: {
        type: String,
        enum: ['ACTIVO', 'INACTIVO', 'RETIRADO'],
        default: 'ACTIVO',
        required: [true, 'El estado es obligatorio'],
    },
},{ collection: 'estudiante_CEBA', timestamps: true, versionKey: false });

module.exports = model('Estudiante_CEBA', EstudianteCebaSchema);