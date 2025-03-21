const { response } = require('express');
const CategoriaUniforme = require('../models/categoria_uniforme');

const getCategoriaUniformes = async (req, res = response) => {

    try {

        const sort = { updatedAt: -1 };

        const categoria_uniforme = await CategoriaUniforme.find().sort(sort);

        res.json(categoria_uniforme);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getCategoriaUniforme = async (req, res = response) => {

    try {

        const categoria_uniforme = await CategoriaUniforme.findById(req.params.id);

        if (!categoria_uniforme) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipos del activo no encontrado'
            });
        }

        res.json(categoria_uniforme);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarCategoriaUniforme = async (req, res = response) => {
    
        try {
    
            const { nombre, descripcion, estado } = req.body;
    
            const categoriaUniformeDB = await CategoriaUniforme.findOne({ nombre });
            
            if (categoriaUniformeDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El tipo de activo ya existe'
                });
            }
    
            const data = {
                nombre,
                descripcion,
                estado,
            }
    
            const categoria_uniforme = new CategoriaUniforme(data);
    
            await categoria_uniforme.save();

            res.status(201).json(categoria_uniforme);
    
        } catch (error) {
    
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

const actualizarCategoriaUniforme = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { nombre, descripcion, estado } = req.body;

        const data = {
            nombre,
            descripcion,
            estado,
        }

        const categoria_uniforme = await CategoriaUniforme.findByIdAndUpdate(id, data, { new: true });

        res.json(categoria_uniforme);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarCategoriaUniforme = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const categoria_uniforme = await CategoriaUniforme.findByIdAndDelete(id);

        res.json(categoria_uniforme);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getCategoriaUniformes,
    getCategoriaUniforme,
    registrarCategoriaUniforme,
    actualizarCategoriaUniforme,
    eliminarCategoriaUniforme,
}