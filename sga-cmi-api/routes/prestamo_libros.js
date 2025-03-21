/*
    Ruta: /api/libros
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getPrestamoLibros, getPrestamoLibro, registrarPrestamoLibro, actualizarPrestamoLibro, eliminarPrestamoLibro, getLibroByCodigo } = require('../controllers/prestamo_libros');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getPrestamoLibros);

router.get('/:id', getPrestamoLibro);

router.post('/', [
    validarJWT,
    // check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('libro', 'El libro es obligatoria').isMongoId(),
    validarCampos,
], registrarPrestamoLibro);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    // check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarPrestamoLibro);

router.get('/libros/:codigo', getLibroByCodigo);

// router.get('/autor/:autor', getFrases);

// router.put('/inactivar/:id',validarJWT, inactivarFrase);

// router.put('/activar/:id', validarJWT, activarFrase);

// Borrar una frase - Admin

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').isMongoId(),
    validarCampos,
], eliminarPrestamoLibro);

module.exports = router;