const { response } = require('express');
const Mapa = require('../models/mapa');

const getMapas = async (req, res = response) => {

    try {

        const mapas = await Mapa.find().populate('grado',
                                                    'nombre descripcion estado createdAt updatedAt').sort({ updatedAt: -1 });

        res.json(mapas);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getMapa = async (req, res = response) => {

    try {

        const mapa = await Mapa.findById(req.params.id).populate('grado', 
                                                                    'nombre descripcion estado createdAt updatedAt');

        if (!mapa) {
            return res.status(404).json({
                ok: false,
                msg: 'La mapa no se ha encontrado'
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

const registrarMapa = async (req, res = response) => {
    
        try {
    
            const { nombre, grado, cantidad, img, descripcion } = req.body;
    
            // const mapaDB = await Mapa.findOne({ codigo });
            
            // if (mapaDB) {
            //     return res.status(400).json({
            //         ok: false,
            //         msg: 'La mapa ya existe'
            //     });
            // }
    
            const data = {
                nombre,
                grado,
                cantidad,
                img,
                descripcion
            }

            const count = await Mapa.countDocuments();

            data.codigo = count + 1;

            // if I find an equal number, change it to the next number after the code with the highest value.

            while (await Mapa.exists({ codigo: data.codigo })) {
                data.codigo++;
            }
    
            const mapa = new Mapa(data);
    
            await mapa.save();

            const mapas = await Mapa.find().populate({ path: 'grado', select: 'nombre descripcion estado createdAt updatedAt' }).exec();
    
            res.status(201).json(mapas);
    
        } catch (error) {
    
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

const actualizarMapa = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { codigo, nombre, grado, cantidad, img, descripcion, estado } = req.body;

        const data = {
            codigo,
            nombre,
            grado,
            cantidad,
            img,
            descripcion,
            estado
        }

        const mapa = await Mapa.findByIdAndUpdate(id, data, { new: true }).populate('grado',
                                                                                        'nombre descripcion estado createdAt updatedAt');

        res.json(mapa);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarMapa = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const mapa = await Mapa.findByIdAndDelete(id);

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
    getMapas,
    getMapa,
    registrarMapa,
    actualizarMapa,
    eliminarMapa,
}