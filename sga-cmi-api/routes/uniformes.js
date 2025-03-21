/*
    Ruta: /api/uniformes
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUniformes, getUniforme, registrarUniforme, actualizarUniforme, eliminarUniforme } = require('../controllers/uniformes');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getUniformes);

router.get('/:id', getUniforme);

router.post('/', [
    validarJWT,
    check('articulo', 'El nombre del articulo es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatorio').not().isEmpty(),
    validarCampos,
], registrarUniforme);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarUniforme);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').isMongoId(),
    validarCampos,
], eliminarUniforme);

module.exports = router;