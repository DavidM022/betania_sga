const { response } = require('express');
const PrestamoLibros = require('../models/prestamo_libros');
const Libro = require('../models/libro');

const getPrestamoLibros = async (req, res = response) => {

    try {

        const prestamo_libros = await PrestamoLibros.find().populate(['estudiante', 'libro', 'docente']).sort({ updatedAt: -1 });

        res.json(prestamo_libros);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getPrestamoLibro = async (req, res = response) => {

    try {

        const prestamo_libro = await PrestamoLibros.findById(req.params.id).populate(['estudiante', 'libro', 'docente']);

        if (!prestamo_libro) {
            return res.status(404).json({
                ok: false,
                msg: 'Registro de prestamo_libro no encontrado'
            });
        }

        res.json(prestamo_libro);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarPrestamoLibro = async (req, res = response) => {
    try {
        const {
            codigo,
            estudiante,
            docente,
            libro,
            fecha_prestamo,
            fecha_devolucion,
            descripcion_entrega,
            descripcion_devolucion,
            estado,
            observaciones
        } = req.body;

        const prestamo_libroDB = await PrestamoLibros.findOne({ codigo });

        if (prestamo_libroDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El registro de préstamo de libro ya existe'
            });
        }

        let data = {};

        const codigoPrestamoLibro = await generarCodigoPrestamoLibro();

        if (docente === '') {
            data = {
                codigo: codigoPrestamoLibro,
                estudiante,
                libro,
                fecha_prestamo,
                fecha_devolucion,
                descripcion_entrega,
                descripcion_devolucion,
                estado,
                observaciones,
            };
        } else {
            data = {
                codigo: codigoPrestamoLibro,
                docente,
                libro,
                fecha_prestamo,
                fecha_devolucion,
                descripcion_entrega,
                descripcion_devolucion,
                estado,
                observaciones,
            };
        }

        console.log(data);

        const prestamo_libro = new PrestamoLibros(data);
        await prestamo_libro.save();

        const prestamo_libros = await PrestamoLibros.find().populate(['estudiante', 'libro']);

        res.json(prestamo_libros);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const generarCodigoPrestamoLibro = async () => {
    const maxCodigoPrestamoLibro = await PrestamoLibros.findOne({}, { codigo: 1 })
        .sort({ codigo: -1 })
        .limit(1);

    let nuevoCodigo = 'PL1';
    if (maxCodigoPrestamoLibro) {
        const ultimoCodigo = maxCodigoPrestamoLibro.codigo;
        const ultimoNumero = parseInt(ultimoCodigo.substr(2));
        nuevoCodigo = `PL${ultimoNumero + 1}`;
    }

    return nuevoCodigo;
};


const actualizarPrestamoLibro = async (req, res = response) => {
    try {

        const { id } = req.params;

        const { codigo, estudiante, docente, libro, fecha_prestamo, fecha_devolucion, descripcion_entrega, descripcion_devolucion, estado, observaciones } = req.body;

        let data = {};

        if (docente === '') {
            data = {
                codigo,
                estudiante,
                libro,
                fecha_prestamo,
                fecha_devolucion,
                descripcion_entrega,
                descripcion_devolucion,
                estado: 'DEVUELTO',
                observaciones,
            }
        } else {
            data = {
                codigo,
                docente,
                libro,
                fecha_prestamo,
                fecha_devolucion,
                descripcion_entrega,
                descripcion_devolucion,
                estado: 'DEVUELTO',
                observaciones,
            }
        }

        const prestamo_libro = await PrestamoLibros.findByIdAndUpdate(id, data, { new: true }).populate(['estudiante', 'libro', 'docente']);

        res.json(prestamo_libro);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarPrestamoLibro = async (req, res = response) => {
    try {

        const { id } = req.params;

        const prestamo_libro = await PrestamoLibros.findByIdAndDelete(id);

        res.json(prestamo_libro);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getLibroByCodigo = async (req, res = response) => {

    try {

        const { codigo } = req.params;

        const libro = await Libro.findOne({ codigo });

        if (!libro) {
            return res.status(404).json({
                ok: false,
                msg: 'Libro no encontrado'
            });
        }

        res.json(libro);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

module.exports = {
    getPrestamoLibros,
    getPrestamoLibro,
    registrarPrestamoLibro,
    actualizarPrestamoLibro,
    eliminarPrestamoLibro,
    getLibroByCodigo,
}