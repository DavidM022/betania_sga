/*
    Ruta: /api/categoria_uniforme
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getCategoriaUniformes, getCategoriaUniforme, registrarCategoriaUniforme, actualizarCategoriaUniforme, eliminarCategoriaUniforme } = require('../controllers/categoria_uniforme');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getCategoriaUniformes);

router.get('/:id', getCategoriaUniforme);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], registrarCategoriaUniforme);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarCategoriaUniforme);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').isMongoId(),
    validarCampos,
], eliminarCategoriaUniforme);

module.exports = router;