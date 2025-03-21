/*
    Ruta: /api/pagos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { 
    getPagos,
    getPago, 
    registrarPago, 
    actualizarPago, 
    eliminarPago,
    getPagoByEstudiante,
    actualizarEstadoPago,
} = require('../controllers/pagos_ceba');

const { validarJWT, validarADMIN_ROLE, varlidarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getPagos);

router.get('/:id', getPago);

router.get('/estudiante/:id', getPagoByEstudiante);

router.post('/', [
    validarJWT, 
    validarADMIN_ROLE,
    check('estudiante', 'El estudiante es obligatorios').not().isEmpty(),
    check('meses', 'El mes es obligatorios').not().isEmpty(),
    check('anio', 'El año es obligatorios').not().isEmpty(),
    check('importe', 'El monto del impoerte es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos,
] , registrarPago);

router.put('/:id',[
    validarJWT, 
    validarADMIN_ROLE,
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('estudiante', 'El estudiante es obligatorios').not().isEmpty(),
    validarCampos,
], actualizarPago);

router.put('/estado/:id',
    validarJWT,
    validarADMIN_ROLE,
    actualizarEstadoPago
);

router.delete('/:id' ,
    [
        validarJWT,
        validarADMIN_ROLE,
        check('id', 'El id es obligatorio').not().isEmpty(),
        validarCampos,
    ], eliminarPago);

module.exports = router;