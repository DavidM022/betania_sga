/*
    Ruta: /api/estudiantes
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { 
    getEstudiantes,
    getEstudiante, 
    registrarEstudiante, 
    actualizarEstudiante, 
    eliminarEstudiante,
    getEstudianteByDni,
    searchStudent,
} = require('../controllers/estudiantes');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [validarJWT], getEstudiantes);

router.get('/:id', getEstudiante);

router.get('/dni/:dni', getEstudianteByDni);

router.get('/search/:search', searchStudent);

router.post('/', [
    validarJWT, 
    validarADMIN_ROLE,
    check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('dni', 'El dni son obligatorios').not().isEmpty(),
    check('sexo', 'El sexo es obligatorio').not().isEmpty(),
    check('turno', 'El turno es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos,
] , registrarEstudiante);

router.put('/:id',[
    validarJWT, 
    validarADMIN_ROLE,
    check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('dni', 'El dni son obligatorios').not().isEmpty(),
    validarCampos,
], actualizarEstudiante);

router.delete('/:id' ,
    [
        validarJWT,
        validarADMIN_ROLE,
        check('id', 'El id es obligatorio').not().isEmpty(),
        validarCampos,
    ], eliminarEstudiante);

module.exports = router;