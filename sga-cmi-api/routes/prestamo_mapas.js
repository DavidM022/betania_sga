/*
    Ruta: /api/prestamo_mapas
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getPrestamoMapas,
    getPrestamoMapa,
    registrarPrestamoMapa,
    actualizarPrestamoMapa,
    eliminarPrestamoMapa,
    getMapaByCodigo
} = require('../controllers/prestamo_mapas');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getPrestamoMapas);

router.get('/:id', getPrestamoMapa);

router.post('/', [
    validarJWT,
    check('mapa', 'El mapa es obligatoria').isMongoId(),
    validarCampos,
], registrarPrestamoMapa);

router.put('/:id', [
    validarJWT,
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarPrestamoMapa);


router.get('/mapas/:codigo', getMapaByCodigo);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').isMongoId(),
    validarCampos,
], eliminarPrestamoMapa);

module.exports = router;