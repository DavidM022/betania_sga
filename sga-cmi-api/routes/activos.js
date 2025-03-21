/*
    Ruta: /api/activos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getActivos, getActivo, registrarActivo, actualizarActivo, eliminarActivo } = require('../controllers/activos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Activos
 *  description: Manejo de API para Activos
 * /activos:
 *  post:
 *      summary: Create a new activo
 *      tags: [Activos]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activos'
 *      responses:  
 *          200:
 *              description: The created activos.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Activos'
 *          500:
 *              description: Some server error
 * components:
 *   schemas:
 *     Activos:
 *       type: object
 *       required:
 *         - codigo
 *         - nombre
 *         - tipo_activo
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the activo
 *         codigo:
 *           type: number
 *           description: The title of your activo
 *         nombre:
 *           type: string
 *           description: The activo nombre
 *         tipo_activo:
 *           type: string
 *           description: The activo nombre
 *         modelo:
 *           type: string
 *           description: Whether you have modelo reading the activo
 *         marca:
 *           type: string
 *           description: Whether you have marca reading the activo
 *         color:
 *           type: string
 *           description: Whether you have color reading the activo
 *         procesador:
 *           type: string
 *           description: Whether you have procesador reading the activo
 *         ram:
 *           type: string
 *           description: Whether you have ram reading the activo
 *         accesdorios:
 *           type: string
 *           description: Whether you have accesdorios reading the activo
 *         condicion:
 *           type: string
 *           description: Whether you have condicion reading the activo
 *         cantidad:
 *           type: number
 *           description: Whether you have cantidad reading the activo
 *         fecha_compra:
 *           type: date
 *           description: Whether you have fecha_compra reading the activo
 *         descripcion:
 *           type: string
 *           description: Whether you have descripcion reading the activo
 *         ubicacion:
 *           type: string
 *           description: Whether you have ubicacion reading the activo
 *         responsable:
 *           type: string
 *           description: Whether you have responsable reading the activo
 *         fecha_anulacion:
 *           type: date
 *           description: Whether you have fecha_anulacion reading the activo
 *         img:
 *           type: string
 *           description: Whether you have img reading the activo
 *         observaciones:
 *           type: string
 *           description: Whether you have observaciones reading the activo
 *         estado:
 *           type: string
 *           description: Whether you have estado reading the activo
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the activo was added
 *       example:
 *         id: ggsd5543gasdfasdfs234151
 *         codigo: TASDFAGADGA542
 *         tipo_activo: safasfasdfasdfasfer43124
 *         modelo: LENOVO-L340
 *         marca: LENOVO
 *         color: NEGRO
 *         procesador: RAYZEN - 9
 *         ram: 64GB
 *         accesorios: MOUSE, MOUSE PAD, TECLADO
 *         condicion: BUENO
 *         cantidad: 120
 *         fecha_compra: 2020-03-10T04:05:06.157Z
 *         decripcion: mi descripcion de este activo
 *         ubicacion: AULA 303
 *         responsable: Julio Gonzalez
 *         fecha_anulacion: 2020-03-10T04:05:06.157Z
 *         img: safasfasdfasdfasfer43124fasdfasdfasdfafdasdfafasdfasdfasdf.jpg
 *         observaciones: ninguna
 *         estado: true
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

router.get('/', getActivos);

router.get('/:id', getActivo);

router.post('/', [
    validarJWT,
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('tipo_activo', 'El tipo de activo es obligatorio').not().isEmpty(),
    validarCampos,
], registrarActivo);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('tipo_activo', 'El tipo de activo es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarActivo);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').isMongoId(),
    validarCampos,
], eliminarActivo);

module.exports = router;