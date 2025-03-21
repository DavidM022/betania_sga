const { response } = require('express');
const Libro = require('../models/libro');

const getLibros = async (req, res = response) => {

    try {

        const libros = await Libro.find().populate('grado',
                                                    'nombre descripcion').sort({ updatedAt: -1 });

        res.json(libros);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getLibro = async (req, res = response) => {

    try {

        const libro = await Libro.findById(req.params.id).populate('grado', 
                                                                    'nombre descripcion');

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

const registrarLibro = async (req, res = response) => {
    
        try {
    
            const { titulo, nombre, descripcion, editorial, autor, cantidad, grado, img, es_obra_literaria, estado, observaciones } = req.body;
    
            // const libroDB = await Libro.findOne({ codigo });
            
            // if (libroDB) {
            //     return res.status(400).json({
            //         ok: false,
            //         msg: 'El libro ya existe'
            //     });
            // }
    
            const data = {
                titulo,
                nombre,
                descripcion,
                editorial,
                autor,
                cantidad,
                grado,
                img,
                es_obra_literaria,
                estado,
                observaciones,
            }

            const count = await Libro.countDocuments();

            data.codigo = count + 1;

            // if the same code exists, change

            while (await Libro.exists({ codigo: data.codigo })) {
                data.codigo++;
            }
    
            const libro = new Libro(data);
    
            await libro.save();

            const libros = await libro.populate('grado', 'nombre descripcion');
    
            res.json(libros);
    
        } catch (error) {
    
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

const actualizarLibro = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { titulo, nombre, descripcion, codigo, editorial, autor, cantidad, grado, img, es_obra_literaria, estado, observaciones } = req.body;

        const data = {
            titulo,
            nombre,
            descripcion,
            codigo,
            editorial,
            autor,
            cantidad,
            grado,
            img,
            estado,
            es_obra_literaria,
            observaciones
        }

        const libro = await Libro.findByIdAndUpdate(id, data, { new: true }).populate('grado',
                                                                                        'nombre descripcion estado createdAt updatedAt');

        res.json(libro);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarLibro = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const libro = await Libro.findByIdAndDelete(id);

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
    getLibros,
    getLibro,
    registrarLibro,
    actualizarLibro,
    eliminarLibro,
}