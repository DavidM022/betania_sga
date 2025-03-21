/*
    Ruta: /api/reportes/ebr || /api/reportes/ceba || /api/reportes/residencia
*/

const { Router } = require('express');

const { 
    generarInformeDiario,
    getDataBetweenDates,
    getDataforGraph,
    getAllReporteERB,
    getAllReporteCEBA,
    getAllReporteRESIDENCIA,
} = require('../controllers/reportes');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/reporte_hoy', generarInformeDiario);
router.get('/ebr', getAllReporteERB);
router.get('/ceba', getAllReporteCEBA);
router.get('/residencia', getAllReporteRESIDENCIA);
router.get('/reporte_fechas', getDataBetweenDates);
router.get('/reporte_graficos', getDataforGraph);

module.exports = router;