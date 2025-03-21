/*
    Ruta: /api/frases
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getFrases, getFrase, crearFrase, actualizarFrase, borrarFrase, inactivarFrase, activarFrase, getFraseRandom } = require('../controllers/frases');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Obtener todas las frases - publico
router.get('/', getFrases);

// Obtener una frase por id - publico
router.get('/:id', getFrase);

// Obtener una frase aleatoria - publico
router.get('/frase/random', getFraseRandom);

// Crear frase - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('contenido', 'El contenido es obligatorio').not().isEmpty(),
    check('autor', 'El autor es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').isMongoId(),
    validarCampos,
], crearFrase);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('contenido', 'El contenido es obligatorio').not().isEmpty(),
    check('autor', 'El autor es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').isMongoId(),
    validarCampos,
], actualizarFrase);

// Obtener por categoria - publico
router.get('/categoria/:categoria', getFrases);

// obtener por autor - publico
router.get('/autor/:autor', getFrases);

// Inactivar una frase - Admin
router.put('/inactivar/:id',validarJWT, inactivarFrase);

// Activar una frase - Admin
router.put('/activar/:id', validarJWT, activarFrase);

// Borrar una frase - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').isMongoId(),
    validarCampos,
], borrarFrase);

module.exports = router;