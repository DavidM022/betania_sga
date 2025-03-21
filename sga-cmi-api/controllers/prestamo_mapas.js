const { response } = require('express');
const PrestamoMapas = require('../models/prestamo_mapas');
const Mapa = require('../models/mapa');

const getPrestamoMapas = async (req, res = response) => {

    try {

        const prestamo_mapas = await PrestamoMapas.find().populate(['estudiante', 'mapa', 'docente']).sort({ updatedAt: -1 });

        res.json(prestamo_mapas);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getPrestamoMapa = async (req, res = response) => {

    try {

        const prestamo_mapa = await PrestamoMapas.findById(req.params.id).populate(['estudiante', 'mapa', 'docente']);

        if (!prestamo_mapa) {
            return res.status(404).json({
                ok: false,
                msg: 'Registro de prestamo mapa no encontrado'
            });
        }

        res.json(prestamo_mapa);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarPrestamoMapa = async (req, res = response) => {

    try {

        const { codigo, estudiante, docente, mapa, fecha_prestamo, fecha_devolucion, descripcion_entrega, descripcion_devolucion, estado, observaciones } = req.body;

        const prestamo_mapaDB = await PrestamoMapas.findOne({ codigo });

        if (prestamo_mapaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El registro de prestamo_mapas ya existe'
            });
        }

        let data = {};

        const codigoPrestamo = await generarCodigoPrestamo();

        if (docente === '') {
            data = {
                codigo: codigoPrestamo,
                estudiante,
                mapa,
                fecha_prestamo,
                fecha_devolucion,
                descripcion_entrega,
                descripcion_devolucion,
                estado,
                observaciones,
            }
        } else {
            data = {
                codigo: codigoPrestamo,
                docente,
                mapa,
                fecha_prestamo,
                fecha_devolucion,
                descripcion_entrega,
                descripcion_devolucion,
                estado,
                observaciones,
            }
        }

        const prestamo_mapa = new PrestamoMapas(data);

        await prestamo_mapa.save();

        const prestamo_mapas = await prestamo_mapa.populate(['estudiante', 'docente', 'mapa']);

        res.json(prestamo_mapas);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const generarCodigoPrestamo = async () => {
    const maxCodigoPrestamoLibro = await PrestamoMapas.findOne({}, { codigo: 1 })
        .sort({ codigo: -1 })
        .limit(1);

    let nuevoCodigo = 'PM1';
    if (maxCodigoPrestamoLibro) {
        const ultimoCodigo = maxCodigoPrestamoLibro.codigo;
        const ultimoNumero = parseInt(ultimoCodigo.substr(2));
        nuevoCodigo = `PM${ultimoNumero + 1}`;
    }

    return nuevoCodigo;
};

const actualizarPrestamoMapa = async (req, res = response) => {
    try {

        const { id } = req.params;

        const { codigo, estudiante, docente, mapa, fecha_prestamo, fecha_devolucion, descripcion_entrega, descripcion_devolucion, estado, observaciones } = req.body;

        let data = {};

        if (docente === '') {
            data = {
                codigo,
                estudiante,
                mapa,
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
                mapa,
                fecha_prestamo,
                fecha_devolucion,
                descripcion_entrega,
                descripcion_devolucion,
                estado: 'DEVUELTO',
                observaciones,
            }
        }

        const prestamo_mapa = await PrestamoMapas.findByIdAndUpdate(id, data, { new: true }).populate(['estudiante', 'mapa', 'docente']);

        res.json(prestamo_mapa);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarPrestamoMapa = async (req, res = response) => {
    try {

        const { id } = req.params;

        const prestamo_mapa = await PrestamoMapas.findByIdAndDelete(id);

        res.json(prestamo_mapa);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getMapaByCodigo = async (req, res = response) => {

    try {

        const { codigo } = req.params;

        const mapa = await Mapa.findOne({ codigo });

        if (!mapa) {
            return res.status(404).json({
                ok: false,
                msg: 'Mapa no encontrado'
            });
        }

        res.json(mapa);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

module.exports = {
    getPrestamoMapas,
    getPrestamoMapa,
    registrarPrestamoMapa,
    actualizarPrestamoMapa,
    eliminarPrestamoMapa,
    getMapaByCodigo,
}