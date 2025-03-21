const { response } = require('express');

const Estudiante = require('../models/estudiante_ebr');

const getEstudiantes = async (req, res = response) => {

    try {

        const desde = Math.max(0, Number(req.query.desde) || 0);
        const hasta = Math.max(0, Number(req.query.hasta) || 10);

        if (hasta <= 0 || desde >= hasta) {
            return res.json({
                ok: true,
                estudiantes: [],
                total: 0,
            });
        }

        const limite = hasta - desde; // Calcular el límite correcto

        const [estudiantes, total] = await Promise.all([
            Estudiante.find()
                .populate('grado', 'nombre descripcion estado createdAt updatedAt')
                .sort({ updatedAt: -1 }) // Ordenar por updatedAt en orden descendente (los más recientes primero)
                .skip(desde)
                .limit(limite)
                .lean(),
            Estudiante.countDocuments(),
        ]);

        res.json({
            estudiantes,
            total,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getEstudiante = async (req, res = response) => {

    try {

        const estudiante = await Estudiante.findById(req.params.id).populate('grado',
            'nombre descripcion estado createdAt updatedAt');

        if (!estudiante) {
            return res.status(404).json({
                ok: false,
                msg: 'Estudiante no encontrado'
            });
        }

        res.json(estudiante);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarEstudiante = async (req, res = response) => {

    try {

        const { nombres, apellidos, dni, sexo, correo, celular, fecha_nacimiento, nombre_padres, celular_padres, correo_padres, colegio_procedencia, tipo_estudiante, grado, turno, img, estado } = req.body;

        const estudianteDB = await Estudiante.findOne({ dni });

        if (estudianteDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El estudiante con ese DNI ya existe'
            });
        }

        const data = {
            nombres,
            apellidos,
            dni,
            sexo,
            correo,
            celular,
            fecha_nacimiento,
            nombre_padres,
            celular_padres,
            correo_padres,
            colegio_procedencia,
            tipo_estudiante,
            grado,
            turno,
            img,
            estado
        }

        const estudiante = new Estudiante(data);

        await estudiante.save();

        const estudiantes = await Estudiante.find().populate('grado',
            'nombre descripcion estado createdAt updatedAt');

        res.status(201).json(estudiantes);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const actualizarEstudiante = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { nombres, apellidos, dni, sexo, correo, celular, domicilio, fecha_nacimiento, nombre_padres, celular_padres, correo_padres, colegio_procedencia, tipo_estudiante, grado, turno, img, estado } = req.body;

        const data = {
            nombres,
            apellidos,
            dni,
            sexo,
            correo,
            celular,
            domicilio,
            fecha_nacimiento,
            nombre_padres,
            celular_padres,
            correo_padres,
            colegio_procedencia,
            tipo_estudiante,
            grado,
            turno,
            img,
            estado
        }

        const estudianteActualizado = await Estudiante.findByIdAndUpdate(id, data, { new: true }).populate('grado',
            'nombre descripcion estado createdAt updatedAt');

        res.json(estudianteActualizado);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarEstudiante = async (req, res = response) => {
    try {

        const { id } = req.params;

        const estudiante = await Estudiante.findByIdAndDelete(id);

        res.json(estudiante);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getEstudianteByDni = async (req, res = response) => {

    try {

        const { dni } = req.params;

        const estudiante = await Estudiante.findOne({ dni });

        if (!estudiante) {
            return res.status(404).json({
                ok: false,
                msg: 'El estudiante no ha sido encontrado'
            });
        }

        res.json(estudiante);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const searchStudent = async (req, res = response) => {

    try {

        const { search } = req.params;

        const regex = new RegExp(search, 'i');

        const estudiantes = await Estudiante.find({ $or: [{ nombres: regex }, { apellidos: regex }, { dni: regex }] })
            .populate('grado', 'nombre descripcion estado createdAt updatedAt');

        res.json(estudiantes);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getEstudiantes,
    getEstudiante,
    registrarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
    getEstudianteByDni,
    searchStudent
}