const { response } = require('express');
const Laboratorio = require('../models/laboratorio');

const getEquiposLaboratorio = async (req, res = response) => {

    try {

        const equiposLaboratorio = await Laboratorio.find().sort({ updatedAt: -1 });

        res.json(equiposLaboratorio);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getEquipoLaboratorio = async (req, res = response) => {

    try {

        const equipoLaboratorio = await Laboratorio.findById(req.params.id);

        if (!equipoLaboratorio) {
            return res.status(404).json({
                ok: false,
                msg: 'Equipo de laboratorio no encontrado'
            });
        }

        res.json(equipoLaboratorio);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarEquipoLaboratorio = async (req, res = response) => {
    
        try {
    
            const { nombre, modelo, marca, color, accesorios, condicion, cantidad, fecha_ingreso, descripcion, ubicacion, responsable, img, observaciones, fecha_anulacion, estado } = req.body;
    
            // const equipoLaboratorio = await Laboratorio.findOne({ codigo });
            
            // if (equipoLaboratorio) {
            //     return res.status(400).json({
            //         ok: false,
            //         msg: 'El equipo del laboratorio ya existe con ese codigo'
            //     });
            // }
    
            const data = {
                nombre,
                modelo,
                marca,
                color,
                accesorios,
                condicion,
                cantidad,
                fecha_ingreso,
                descripcion,
                ubicacion,
                responsable,
                img,
                observaciones,
                fecha_anulacion,
                estado
            }

            const count = await Laboratorio.countDocuments();

            data.codigo = count + 1;

            // if I find an equal number, change it to the next number after the code with the highest value.

            while (await Laboratorio.exists({ codigo: data.codigo })) {
                data.codigo++;
            }
    
            const laboratorio = new Laboratorio(data);
    
            await laboratorio.save();

            res.status(201).json(laboratorio);
    
        } catch (error) {
    
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

const actualizarEquipoLaboratorio = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { codigo, nombre, modelo, marca, color, accesorios, condicion, cantidad, fecha_ingreso, descripcion, img, ubicacion, responsable, observaciones, fecha_anulacion, estado } = req.body;

        const data = {
            codigo,
            nombre,
            modelo,
            marca,
            color,
            accesorios,
            condicion,
            cantidad,
            fecha_ingreso,
            descripcion,
            ubicacion,
            responsable,
            img,
            observaciones,
            fecha_anulacion,
            estado
        };

        const equipoLaboratorioActualizado = await Laboratorio.findByIdAndUpdate(id, data, { new: true })

        res.json(equipoLaboratorioActualizado);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarEquipoLaboratorio = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const equipoLaboratorio = await Laboratorio.findByIdAndDelete(id);

        res.json(equipoLaboratorio);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getEquiposLaboratorio,
    getEquipoLaboratorio,
    registrarEquipoLaboratorio,
    actualizarEquipoLaboratorio,
    eliminarEquipoLaboratorio,
}