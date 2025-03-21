const { response } = require('express');
const Activo = require('../models/activo');

const getActivos = async (req, res = response) => {

    try {

        const sort = { updatedAt: -1 };

        const activos = await Activo.find().populate('tipo_activo',
                    'codigo nombre descripcion estado createdAt updatedAt').sort(sort);;

        res.json(activos);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getActivo = async (req, res = response) => {

    try {

        const activo = await Activo.findById(req.params.id).populate('tipo_activo',
                        'codigo nombre descripcion estado createdAt updatedAt');
;

        if (!activo) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipos del activo no encontrado'
            });
        }

        res.json(activo);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarActivo = async (req, res = response) => {
    
        try {
    
            const { nombre, tipo_activo, modelo, marca, color, procesador, ram, accesorios, condicion, cantidad, fecha_compra, descripcion, ubicacion, responsable, img, observaciones, fecha_anulacion, estado } = req.body;
    
            const data = {
                nombre,
                tipo_activo,
                modelo,
                marca,
                color,
                procesador,
                ram,
                accesorios,
                condicion,
                cantidad,
                fecha_compra,
                descripcion,
                ubicacion,
                responsable,
                img,
                observaciones,
                fecha_anulacion,
                estado
            }

            const count = await Activo.countDocuments();

            data.codigo = count + 1;

            // if I find an equal number, change it to the next number after the code with the highest value.

            while (await Activo.exists({ codigo: data.codigo })) {
                data.codigo++;
            }

            const activo = new Activo(data);
    
            await activo.save();

            const activos = await Activo.find().populate('tipo_activo',
                    'codigo nombre descripcion estado createdAt updatedAt');

            res.status(201).json(activos);
    
        } catch (error) {
    
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

const actualizarActivo = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { codigo, nombre, tipo_activo, modelo, marca, color, procesador, ram, accesorios, condicion, cantidad, fecha_compra, descripcion, img, ubicacion, responsable, observaciones, fecha_anulacion, estado } = req.body;

        const data = {
            codigo,
            nombre,
            tipo_activo,
            modelo,
            marca,
            color,
            procesador,
            ram,
            accesorios,
            condicion,
            cantidad,
            fecha_compra,
            descripcion,
            ubicacion,
            responsable,
            img,
            observaciones,
            fecha_anulacion,
            estado
        };

        const activoActualizado = await Activo.findByIdAndUpdate(id, data, { new: true }).populate('tipo_activo',
        'codigo nombre descripcion estado createdAt updatedAt');;

        res.json(activoActualizado);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarActivo = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const activo = await Activo.findByIdAndDelete(id);

        res.json(activo);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getActivos,
    getActivo,
    registrarActivo,
    actualizarActivo,
    eliminarActivo,
}