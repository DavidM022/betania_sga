/*
    Ruta: /api/tipo_activo
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getTiposActivo, getTipoActivo, registrarTipoActivo, actualizarTipoActivo, eliminarTipoActivo } = require('../controllers/tipos_activo');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getTiposActivo);

router.get('/:id', getTipoActivo);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], registrarTipoActivo);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarTipoActivo);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').isMongoId(),
    validarCampos,
], eliminarTipoActivo);

module.exports = router;