const { response } = require('express');
const Uniforme = require('../models/uniforme');

const getUniformes = async (req, res = response) => {

    try {

        const uniformes = await Uniforme.find().populate('categoria',
                                                    'nombre descripcion').sort({ updatedAt: -1 });

        res.json(uniformes);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getUniforme = async (req, res = response) => {

    try {

        const uniforme = await Uniforme.findById(req.params.id).populate('categoria',
                                                                    'nombre descripcion');

        if (!uniforme) {
            return res.status(404).json({
                ok: false,
                msg: 'Uniforme no encontrado'
            });
        }

        res.json(uniforme);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarUniforme = async (req, res = response) => {
    
        try {
    
            const { articulo, codigo, descripcion, cantidad, precio, talla, caracteristicas, categoria, img, estado, observaciones } = req.body;
    
            // const uniformeDB = await Uniforme.findOne({ codigo });
            
            // if (uniformeDB) {
            //     return res.status(400).json({
            //         ok: false,
            //         msg: 'El uniforme con ese codigo ya existe'
            //     });
            // }
    
            const data = {
                articulo,
                codigo,
                descripcion,
                cantidad,
                precio,
                talla,
                caracteristicas,
                categoria,
                img,
                estado,
                observaciones,
            }

            const count = await Uniforme.countDocuments();

            data.codigo = count + 1;

            // if I find an equal number, change it to the next number after the code with the highest value.

            while (await Uniforme.exists({ codigo: data.codigo })) {
                data.codigo++;
            }
    
            const uniforme = new Uniforme(data);
    
            await uniforme.save();

            const uniformes = await uniforme.populate('categoria',
                                                        'nombre descripcion');
            res.json(uniformes);
    
        } catch (error) {
    
            console.log(error);

            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

const actualizarUniforme = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { articulo, codigo, descripcion, cantidad, precio, talla, caracteristicas, categoria, img, estado, observaciones } = req.body;

        const data = {
            articulo,
            codigo,
            descripcion,
            cantidad,
            precio,
            talla,
            caracteristicas,
            categoria,
            img,
            estado,
            observaciones,
        }

        const uniforme = await Uniforme.findByIdAndUpdate(id, data, { new: true }).populate('categoria',
                                                                'nombre descripcion');

        res.json(uniforme);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarUniforme = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const uniforme = await Uniforme.findByIdAndDelete(id);

        res.json(uniforme);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getUniformes,
    getUniforme,
    registrarUniforme,
    actualizarUniforme,
    eliminarUniforme,
}