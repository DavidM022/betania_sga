/*
    Ruta: /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { login, renewToken, register, updateProfile, recuperarContrasena, resetPassword } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
], login);

router.post('/register', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
], register);

router.put('/update/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    validarCampos,
], updateProfile);

router.get('/renew', validarJWT, renewToken);

router.post('/forgot-password', recuperarContrasena);

// resetPassword
router.post('/reset-password', [
    check('newPassword', 'La nueva contraseña es obligatorio').not().isEmpty(),
    validarCampos,
], resetPassword);

module.exports = router;