/*
    Ruta: /api/libros
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getLibros, getLibro, registrarLibro, actualizarLibro, eliminarLibro } = require('../controllers/libros');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getLibros);

router.get('/:id', getLibro);

router.post('/', [
    validarJWT,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
], registrarLibro);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarLibro);

// router.get('/categoria/:categoria', getFrases);

// router.get('/autor/:autor', getFrases);

// router.put('/inactivar/:id',validarJWT, inactivarFrase);

// router.put('/activar/:id', validarJWT, activarFrase);

// Borrar una frase - Admin

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').isMongoId(),
    validarCampos,
], eliminarLibro);

module.exports = router;