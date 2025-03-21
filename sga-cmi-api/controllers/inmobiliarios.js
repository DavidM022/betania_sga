const { response } = require('express');
const Inmobiliario = require('../models/inmobiliario');

const getInmobiliarios = async (req, res = response) => {

    try {

        const inmobiliarios = await Inmobiliario.find().populate('grado',
            'nombre descripcion').sort({ updatedAt: -1 });

        res.json(inmobiliarios);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getInmobiliario = async (req, res = response) => {

    try {

        const inmobiliario = await Inmobiliario.findById(req.params.id).populate('grado',
            'nombre descripcion');

        if (!inmobiliario) {
            return res.status(404).json({
                ok: false,
                msg: 'Inmobiliario no encontrado'
            });
        }

        res.json(inmobiliario);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarInmobiliario = async (req, res = response) => {

    try {

        const { nombre, descripcion, cantidad, grado, img, estado, observaciones } = req.body;

        // const inmobiliarioDB = await Inmobiliario.findOne({ codigo });

        // if (inmobiliarioDB) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'La data con ese codigo ya existe'
        //     });
        // }

        const data = {
            nombre,
            descripcion,
            cantidad,
            grado,
            img,
            estado,
            observaciones,
        }

        const count = await Inmobiliario.countDocuments();

        data.codigo = count + 1;

        // if I find an equal number, change it to the next number after the code with the highest value.

        while (await Inmobiliario.exists({ codigo: data.codigo })) {
            data.codigo++;
        }

        const inmobiliario = new Inmobiliario(data);

        await inmobiliario.save();

        const inmobiliarios = await inmobiliario.populate('grado',
            'nombre descripcion');

        res.json(inmobiliarios);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const actualizarInmobiliario = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { nombre, codigo, descripcion, cantidad, grado, img, estado, observaciones } = req.body;

        const data = {
            nombre,
            codigo,
            descripcion,
            cantidad,
            grado,
            img,
            estado,
            observaciones,
        }

        const inmobiliario = await Inmobiliario.findByIdAndUpdate(id, data, { new: true }).populate('grado',
            'nombre descripcion');

        res.json(inmobiliario);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarInmobiliario = async (req, res = response) => {
    try {

        const { id } = req.params;

        const inmobiliario = await Inmobiliario.findByIdAndDelete(id);

        res.json(inmobiliario);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getInmobiliarios,
    getInmobiliario,
    registrarInmobiliario,
    actualizarInmobiliario,
    eliminarInmobiliario,
}