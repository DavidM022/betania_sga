/*
    Ruta: /api/laboratorios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getEquiposLaboratorio, getEquipoLaboratorio, registrarEquipoLaboratorio, actualizarEquipoLaboratorio, eliminarEquipoLaboratorio } = require('../controllers/laboratorios');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getEquiposLaboratorio);

router.get('/:id', getEquipoLaboratorio);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], registrarEquipoLaboratorio);

router.put('/:id', [
    validarJWT,
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarEquipoLaboratorio);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').isMongoId(),
    validarCampos,
], eliminarEquipoLaboratorio);

module.exports = router;