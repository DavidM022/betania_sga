const { response } = require('express');
const Pago = require('../models/pago_ceba');

const getPagos = async (req, res = response) => {

    try {

        const desde = Math.max(0, Number(req.query.desde) || 0);
        const hasta = Math.max(0, Number(req.query.hasta) || 10);

        if (hasta <= 0 || desde >= hasta) {
            return res.json({
                pagos: [],
                total: 0,
            });
        }

        const limite = hasta - desde; // Calcular el límite correcto

        const [pagos, total] = await Promise.all([
            Pago.find().populate('estudiante')
                .sort({ updatedAt: -1 })
                .skip(desde)
                .limit(limite)
                .lean(),
            Pago.countDocuments(),
        ]);

        res.json({
            pagos,
            total,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getPago = async (req, res = response) => {

    try {

        const pago = await Pago.findById(req.params.id).populate('estudiante');

        if (!pago) {
            return res.status(404).json({
                ok: false,
                msg: 'Registro de pago no encontrado'
            });
        }

        res.json(pago);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarPago = async (req, res = response) => {

    try {

        const now = new Date();
        const currentYear = now.getFullYear().toString();

        // Obtener el último pago registrado
        const lastPayment = await Pago.findOne({}, {}, { sort: { codigo: -1 } }).exec();

        let codigo;
        if (lastPayment && typeof lastPayment.codigo === 'string') {
            const lastPaymentYear = lastPayment.codigo.substring(0, 4);

            // Incrementar el contador si el año es el mismo, o establecerlo en 1 si es diferente
            const lastPaymentCount = parseInt(lastPayment.codigo.substring(5));
            const contador = (lastPaymentYear === currentYear) ? lastPaymentCount + 1 : 1;

            // Generar el código con el año actual y el contador
            codigo = `${currentYear}-${contador.toString().padStart(3, '0')}`;
        } else {
            // No hay pagos registrados o el campo 'codigo' no es una cadena de texto válida, generar el primer código del año actual
            codigo = `${currentYear}-001`;
        }

        // Verificar si el código ya existe
        while (await Pago.exists({ codigo })) {
            const lastCodeCount = parseInt(codigo.substring(5));
            codigo = `${currentYear}-${(lastCodeCount + 1).toString().padStart(3, '0')}`;
        }

        req.body.codigo = codigo;

        const pago = new Pago(req.body);

        await pago.save();

        const pagos = await await Pago.findById(pago._id).populate('estudiante').exec();

        res.json(pagos);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const actualizarPago = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { codigo, estudiante, concepto, meses, anio, importe, metodo_pago, descripcion, estado, observaciones } = req.body;

        const data = {
            codigo,
            estudiante,
            concepto,
            meses,
            anio,
            importe,
            metodo_pago,
            descripcion,
            estado,
            observaciones,
        }

        const pago = await Pago.findByIdAndUpdate(id, data, { new: true }).populate('estudiante');

        res.json(pago);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const actualizarEstadoPago = async (req, res = response) => {
    try {
        
        const { id } = req.params;

        // Verificar si el pago existe en la base de datos
        const pago = await Pago.findById(id);

        if (!pago) {
            return res.status(404).json({
                ok: false,
                msg: 'El pago no existe',
            });
        }

        // Actualizar el estado del pago

        if (pago.estado === "PENDIENTE") {
            pago.estado = "CANCELADO";
        }

        await pago.save();

        const pagoActualizada = await Pago.findOne({ _id: pago._id }).populate('estudiante', 'nombres apellidos')

        res.json({
            ok: true,
            msg: 'Estado del pago actualizado exitosamente',
            pago: pagoActualizada,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
}

const eliminarPago = async (req, res = response) => {
    try {

        const { id } = req.params;

        const pago = await Pago.findByIdAndDelete(id);

        res.json(pago);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getPagoByEstudiante = async (req, res = response) => {
    try {

        const { id } = req.params;

        const desde = Math.max(0, Number(req.query.desde) || 0);
        const hasta = Math.max(0, Number(req.query.hasta) || 10);

        if (hasta <= 0 || desde >= hasta) {
            return res.json({
                pagos_by_student: [],
                total_pagos_by_student: 0,
            });
        }

        const limite = hasta - desde; // Calcular el límite correcto

        const [pagos_by_student, total_pagos_by_student] = await Promise.all([
            Pago.find({ estudiante: id }).populate('estudiante')
                .skip(desde)
                .limit(limite)
                .lean(),
            Pago.countDocuments({ estudiante: id }),
        ]);

        res.json({
            pagos_by_student,
            total_pagos_by_student,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getPagos,
    getPago,
    registrarPago,
    actualizarPago,
    eliminarPago,
    getPagoByEstudiante,
    actualizarEstadoPago,
}