const { response } = require('express');

const Docente = require('../models/docente');

const getDocentes = async (req, res = response) => {

    try {

        const sort = { updatedAt: -1 };

        const docente = await Docente.find().sort(sort);

        res.json(docente);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getDocente = async (req, res = response) => {

    try {

        const docente = await Docente.findById(req.params.id);

        if (!docente) {
            return res.status(404).json({
                ok: false,
                msg: 'Persona no encontrado'
            });
        }

        res.json(docente);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarDocente = async (req, res = response) => {
    
        try {
    
            const docentesDB = await Docente.findOne({ dni: req.body.dni });
            
            if (docentesDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El docente con ese DNI ya existe'
                });
            }
    
            const docente = new Docente(req.body);
    
            await docente.save();

            res.status(201).json(docente);
    
        } catch (error) {
    
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

const actualizarDocente = async (req, res = response) => {
    try {

        const { id } = req.params;

        const docenteActualizado = await Docente.findByIdAndUpdate(id, req.body, { new: true });

        res.json(docenteActualizado);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarDocente = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const docente = await Docente.findByIdAndDelete(id);

        res.json(docente);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getDocenteByDni = async (req, res = response) => {

    try {

        const { dni } = req.params;

        const docente = await Docente.findOne({ dni });
        
        if (!docente) {
            return res.status(404).json({
                ok: false,
                msg: 'El docente no ha sido encontrado'
            });
        }

        res.json(docente);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

module.exports = {
    getDocentes,
    getDocente,
    registrarDocente,
    actualizarDocente,
    eliminarDocente,
    getDocenteByDni,
}