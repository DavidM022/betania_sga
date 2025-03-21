const { response } = require('express');
const Grado = require('../models/grado');

const getGrados = async (req, res = response) => {

    try {

        const sort = { updatedAt: -1 };

        const grados = await Grado.find().populate('modalidad',
        'nombre descripcion estado createdAt updatedAt').sort(sort);

        res.json(grados);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getGrado = async (req, res = response) => {
    try {
        
        const sort = { updatedAt: -1 };

        const grado = await Grado.findById(req.params.id).populate('modalidad',
        'nombre descripcion estado createdAt updatedAt').sort(sort);

        res.json(grado);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const crearGrado = async (req, res = response) => {

    try {

        const nombre = req.body.nombre.toUpperCase();
        const descripcion = req.body.descripcion.toUpperCase();
        const modalidad = req.body.modalidad;
        const nivel = req.body.nivel;

        const gradoDB = await Grado.findOne({ nombre });

        if (gradoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El grado ya existe'
            });
        }

        const data = {
            nombre,
            descripcion,
            modalidad,
            nivel,
        }

        const grado = new Grado(data);

        await grado.save();

        const grados = await grado.populate('modalidad',
        'nombre descripcion estado createdAt updatedAt');

        res.status(201).json(grados);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const actualizarGrado = async (req, res = response) => {

    try {

        const { nombre, descripcion, modalidad, nivel } = req.body;
        const nuevoGrado = {
            ...req.body,
            nombre: nombre.toUpperCase(),
            descripcion: descripcion.toUpperCase(),
            modalidad: modalidad,
            nivel: nivel,
        }

        const sort = { updatedAt: -1 };

        const gradoActualizado = await Grado.findByIdAndUpdate(req.params.id, nuevoGrado, { new: true }).populate('modalidad',
        'nombre descripcion estado createdAt updatedAt').sort(sort);

        res.json(gradoActualizado);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarGrado = async (req, res = response) => {
    try {

        const gradoDB = await Grado.findOne(req.params._id);

        if (!gradoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El grado seleccionado, no existe'
            });
        }

        const { id } = req.params;
        const grado = await Grado.findByIdAndDelete(id);
        res.json(grado);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getGrados,
    getGrado,
    crearGrado,
    actualizarGrado,
    eliminarGrado
}