/*
    Ruta: /api/grados
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { 
    getGrado, 
    getGrados, 
    crearGrado,
    actualizarGrado, 
    eliminarGrado,
} = require('../controllers/grados');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getGrados);

router.get('/:id', getGrado);

router.post('/', [ 
    [validarJWT, validarADMIN_ROLE],
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
], crearGrado);

router.put('/:id', [
    [validarJWT, validarADMIN_ROLE],
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
], actualizarGrado);

// router.put('/inactivar/:id', validarJWT, inactivarCategoria);

// router.put('/activar/:id', validarJWT, activarCategoria);

router.delete('/:id', [
    [validarJWT, validarADMIN_ROLE],
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos,
], eliminarGrado);

module.exports = router;