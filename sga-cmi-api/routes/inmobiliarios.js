/*
    Ruta: /api/carpetas
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getInmobiliarios, getInmobiliario, registrarInmobiliario, actualizarInmobiliario, eliminarInmobiliario } = require('../controllers/inmobiliarios');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getInmobiliarios);

router.get('/:id', getInmobiliario);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], registrarInmobiliario);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarInmobiliario);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').isMongoId(),
    validarCampos,
], eliminarInmobiliario);

module.exports = router;