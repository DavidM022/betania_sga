/*
    Ruta: /api/docentes
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { 
    getDocentes,
    getDocente, 
    registrarDocente, 
    actualizarDocente, 
    eliminarDocente,
    getDocenteByDni,
} = require('../controllers/docentes');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getDocentes);

router.get('/:id', getDocente);

router.get('/dni/:dni', getDocenteByDni);

router.post('/', [
    validarJWT, 
    validarADMIN_ROLE,
    check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('dni', 'El dni son obligatorios').not().isEmpty(),
    validarCampos,
] , registrarDocente);

router.put('/:id',[
    validarJWT, 
    validarADMIN_ROLE,
    check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('dni', 'El dni son obligatorios').not().isEmpty(),
    validarCampos,
], actualizarDocente);

router.delete('/:id' ,
    [
        validarJWT,
        validarADMIN_ROLE,
        check('id', 'El id es obligatorio').not().isEmpty(),
        validarCampos,
    ], eliminarDocente);

module.exports = router;