/*
    Ruta: /api/mapas
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getMapas, getMapa, registrarMapa, actualizarMapa, eliminarMapa } = require('../controllers/mapas');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getMapas);

router.get('/:id', getMapa);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], registrarMapa);

router.put('/:id', [
    validarJWT,
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarMapa);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').isMongoId(),
    validarCampos,
], eliminarMapa);

module.exports = router;