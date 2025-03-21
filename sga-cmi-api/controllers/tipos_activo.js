const { response } = require('express');
const TipoActivo = require('../models/tipo_activo');

const getTiposActivo = async (req, res = response) => {

    try {

        const tipos_activo = await TipoActivo.find().sort({ updatedAt: -1 });

        res.json(tipos_activo);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getTipoActivo = async (req, res = response) => {

    try {

        const tipo_activo = await TipoActivo.findById(req.params.id);

        if (!tipo_activo) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipos del activo no encontrado'
            });
        }

        res.json(tipo_activo);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarTipoActivo = async (req, res = response) => {
    
        try {
    
            const { nombre, descripcion, estado } = req.body;
    
            const tipoActivoDB = await TipoActivo.findOne({ nombre });
            
            if (tipoActivoDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El tipo de activo ya existe con ese nombre'
                });
            }
    
            const data = {
                nombre,
                descripcion,
                estado,
            }
    
            const tipo_activo = new TipoActivo(data);
    
            await tipo_activo.save();

            res.status(201).json(tipo_activo);
    
        } catch (error) {
    
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

const actualizarTipoActivo = async (req, res = response) => {
    try {

        const { codigo, nombre, descripcion, estado } = req.body;

        const data = {
            nombre,
            descripcion,
            estado,
        }

        const tipo_activo = await TipoActivo.findByIdAndUpdate(req.params.id, data, { new: true });

        res.json(tipo_activo);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarTipoActivo = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const tipo_activo = await TipoActivo.findByIdAndDelete(id);

        res.json(tipo_activo);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getTiposActivo,
    getTipoActivo,
    registrarTipoActivo,
    actualizarTipoActivo,
    eliminarTipoActivo,
}