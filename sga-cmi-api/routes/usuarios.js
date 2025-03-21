/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { 
    getUsuarios,
    getUsuario, 
    crearUsuario, 
    actualizarUsuario, 
    eliminarUsuario, 
    inactivarUsuario,
    activarUsuario,
} = require('../controllers/usuarios');

const { validarJWT, validarADMIN_ROLE, varlidarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [validarJWT], getUsuarios);

router.get('/:id', [validarJWT], getUsuario);

router.post('/', [
    validarJWT, 
    validarADMIN_ROLE,
    check('nombre', 'Los nombres y apellidos son obligatorios').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    validarCampos,
] , crearUsuario);

router.put('/:id',[
    validarJWT, 
    varlidarADMIN_ROLE_o_MismoUsuario,
    check('nombre', 'Los nombres y apellidos son obligatorios').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    validarCampos,
], actualizarUsuario);

router.delete('/:id' ,
    [
        validarJWT,
        validarADMIN_ROLE,
        check('id', 'El id es obligatorio').not().isEmpty(),
        validarCampos,
    ], eliminarUsuario);

router.put('/inactivar/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
] ,inactivarUsuario);

router.put('/activar/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
] ,activarUsuario);

module.exports = router;