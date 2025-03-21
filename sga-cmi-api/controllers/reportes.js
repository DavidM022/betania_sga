const { response } = require('express');
const PagoEBR = require('../models/pago_ebr');
const Estudiante = require('../models/estudiante');
const EstudianteCEBA = require('../models/estudiante_ceba');
const EstudianteRESIDENCIA = require('../models/estudiante_residencia');
const PagoCEBA = require('../models/pago_ceba');
const PagoRESIDENCIA = require('../models/pago_residencia');
const PrestamoLibros = require('../models/prestamo_libros');
const PrestamoMapas = require('../models/prestamo_mapas');
const Libro = require('../models/libro');
const Mapa = require('../models/mapa');
const Uniforme = require('../models/uniforme');

const getAllReporteERB = async (req, res = response) => {

    try {
        // Obtener los datos de los pagos de la base de datos
        const pagos = await PagoEBR.countDocuments();

        // Obtener la cantidad total de estudiantes
        const totalEstudiantes = await Estudiante.countDocuments();

        // Obtener la cantidad de estudiantes EBR
        const countEstudiantesEBR = await Estudiante.countDocuments({ modalidad: 'EBR' });

        // Obtener la cantidad de estudiantes CEBA
        const countEstudiantesCEBA = await Estudiante.countDocuments({ modalidad: 'CEBA' });

        // Obtener cantidad de libros teniendo en cuenta el campo cantidad de la colección
        const countLibros = await Libro.aggregate([{ $group: { _id: null, total: { $sum: "$cantidad" } } }]);
        const totalCantidadLibros = countLibros.length > 0 ? countLibros[0].total : 0;

        // Obtener cantidad de mapas teniendo en cuenta el campo cantidad de la colección
        const countMapas = await Mapa.aggregate([{ $group: { _id: null, total: { $sum: "$cantidad" } } }]);
        const totalCantidadMapas = countMapas.length > 0 ? countMapas[0].total : 0;

        // Obtener cantidad de uniformes por artículo
        const countUniformesPorArticulo = await Uniforme.aggregate([
            {
                $group: {
                    _id: "$articulo",
                    cantidad: { $sum: "$cantidad" }
                }
            }
        ]);

        // Obtener la cantidad de libros prestados y devueltos
        const countLibrosPrestados = await PrestamoLibros.countDocuments({ estado: 'PRESTADO' });
        const countLibrosDevueltos = await PrestamoLibros.countDocuments({ estado: 'DEVUELTO' });

        // Obtener la cantidad de mapas prestados y devueltos
        const countMapasPrestados = await PrestamoMapas.countDocuments({ estado: 'PRESTADO' });
        const countMapasDevueltos = await PrestamoMapas.countDocuments({ estado: 'DEVUELTO' });

        res.status(200).json({
            ok: true,
            pagos,
            estudiantes: {
                totalEstudiantes,
                countEstudiantesEBR,
                countEstudiantesCEBA,
            },
            libros: {
                totalCantidadLibros,
                countLibrosPrestados,
                countLibrosDevueltos,
            },
            mapas: {
                totalCantidadMapas,
                countMapasPrestados,
                countMapasDevueltos,
            },
            uniformes: {
                totalCantidadUniformes: countUniformesPorArticulo.reduce((total, articulo) => total + articulo.cantidad, 0),
                countUniformesPorArticulo,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los datos',
        });
    }
};

const getAllReporteCEBA = async (req, res = response) => {
    try {
        // Obtener total data de estudiantes ceba
        const totalEstudiantesCEBA = await EstudianteCEBA.countDocuments();

        // Obtener total data de pagos ceba
        const totalPagosCEBA = await PagoCEBA.countDocuments();

        // Obtener top 5 estudiantes con mayor cantidad de pagos
        const top5Estudiantes = await PagoCEBA.aggregate([
            { $group: { _id: "$estudiante", totalPagos: { $sum: 1 } } },
            { $sort: { totalPagos: -1 } },
            { $limit: 5 },
            { $lookup: { from: "estudiante_CEBA", localField: "_id", foreignField: "_id", as: "estudiante" } },
            { $unwind: "$estudiante" },
            { $project: { _id: "$estudiante._id", nombre: "$estudiante.nombre", totalPagos: 1 } }
        ]);

        // Obtener los 10 estudiantes que más han pagado
        const top10EstudiantesPagados = await PagoCEBA.aggregate([
            { $group: { _id: "$estudiante", totalPagado: { $sum: "$importe" } } },
            { $sort: { totalPagado: -1 } },
            { $limit: 10 },
            { $lookup: { from: "estudiante_CEBA", localField: "_id", foreignField: "_id", as: "estudiante" } },
            { $unwind: "$estudiante" },
            { $project: { _id: "$estudiante._id", nombre: "$estudiante.nombre", totalPagado: "$totalPagado" } }
        ]);

        res.status(200).json({
            ok: true,
            estudiantes: {
                totalEstudiantesCEBA,
                top5Estudiantes,
                top10EstudiantesPagados,
            },
            pagos: {
                totalPagosCEBA,
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los datos',
        });
    }
}

const getAllReporteRESIDENCIA = async (req, res = response) => {
    try {
        // Obtener total de estudiantes residencia
        const totalEstudiantesRESIDENCIA = await EstudianteRESIDENCIA.countDocuments();

        // Obtener total de pagos residencia
        const totalPagosRESIDENCIA = await PagoRESIDENCIA.countDocuments();

        // Obtener top 5 estudiantes con mayor cantidad de pagos
        const top5Estudiantes = await PagoRESIDENCIA.aggregate([
            { $group: { _id: "$estudiante", totalPagos: { $sum: 1 } } },
            { $sort: { totalPagos: -1 } },
            { $limit: 5 },
            { $lookup: { from: "estudiante_RESIDENCIA", localField: "_id", foreignField: "_id", as: "estudiante" } },
            { $unwind: "$estudiante" },
            { $project: { _id: "$estudiante._id", nombre: "$estudiante.nombre", totalPagos: 1 } }
        ]);

        // Obtener los 10 estudiantes que más han pagado
        const top10EstudiantesPagados = await PagoRESIDENCIA.aggregate([
            { $group: { _id: "$estudiante", totalPagado: { $sum: "$importe" } } },
            { $sort: { totalPagado: -1 } },
            { $limit: 10 },
            { $lookup: { from: "estudiante_RESIDENCIA", localField: "_id", foreignField: "_id", as: "estudiante" } },
            { $unwind: "$estudiante" },
            { $project: { _id: "$estudiante._id", nombre: "$estudiante.nombre", totalPagado: "$totalPagado" } }
        ]);

        res.status(200).json({
            ok: true,
            estudiantes: {
                totalEstudiantesRESIDENCIA,
                top5Estudiantes,
                top10EstudiantesPagados
            },
            pagos: {
                totalPagosRESIDENCIA,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los datos',
        });
    }
}



const generarInformeDiario = async (req, res = response) => {
    try {

        const sort = { updatedAt: -1 };

        // Obtén las ventas del día actual
        const ventasDia = await PagoEBR.find({ createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } }).populate('estudiante', 'nombres apellidos').sort(sort);

        // Obtén las ventas de la semana actual
        const fechaInicioSemana = obtenerFechaInicioSemana();
        const ventasSemana = await PagoEBR.find({ createdAt: { $gte: fechaInicioSemana } }).populate('estudiante', 'nombres apellidos').sort(sort);

        // Obtén las ventas del mes actual
        const fechaInicioMes = obtenerFechaInicioMes();
        const ventasMes = await PagoEBR.find({ createdAt: { $gte: fechaInicioMes } }).populate('estudiante', 'nombres apellidos').sort(sort);

        // Obtén las ventas del año actual
        const fechaInicioAnio = obtenerFechaInicioAnio();
        const ventasAnio = await PagoEBR.find({ createdAt: { $gte: fechaInicioAnio } });

        // obtener datos para el grafico
        const dataforGraph = await getDataforGraph();

        // Calcula el total de ventas de cada período
        const totalVentasDia = calcularTotalVentas(ventasDia);
        const totalVentasSemana = calcularTotalVentas(ventasSemana);
        const totalVentasMes = calcularTotalVentas(ventasMes);
        const totalVentasAnio = calcularTotalVentas(ventasAnio);

        res.json({
            ok: true,
            total: {
                totalVentasDia,
                totalVentasSemana,
                totalVentasMes,
                totalVentasAnio,
            },
            ventasDia,
            ventasSemana,
            ventasMes,
            dataforGraph,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al generar el informe diario',
        });
    }
};

// Función para obtener la fecha de inicio de la semana actual
const obtenerFechaInicioSemana = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(now.setDate(diff)).setHours(0, 0, 0, 0);
};

// Función para obtener la fecha de inicio del mes actual
const obtenerFechaInicioMes = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1).setHours(0, 0, 0, 0);
};

// Función para obtener la fecha de inicio del año actual
const obtenerFechaInicioAnio = () => {
    const now = new Date();
    return new Date(now.getFullYear(), 0, 1).setHours(0, 0, 0, 0);
};

// Función para calcular el total de ventas
const calcularTotalVentas = (ventas) => {
    let totalVentas = 0;
    ventas.forEach((venta) => {
        totalVentas += venta.importe;
    });
    return totalVentas;
};

const getDataBetweenDates = async (req, res = response) => {
    try {
        // Obtén las fechas desde y hasta de la solicitud
        const { desde, hasta } = req.query;

        // Parsea las fechas a objetos Date
        const fechaDesde = new Date(desde);
        const fechaHasta = new Date(hasta);

        // Agrega la hora de inicio y fin del día a las fechas
        fechaDesde.setHours(0, 0, 0, 0);
        fechaHasta.setHours(23, 59, 59, 999);

        const sort = { updatedAt: -1 };

        // Obtén las ventas dentro del rango de fechas
        const ventas = await PagoEBR.find({ createdAt: { $gte: fechaDesde, $lte: fechaHasta } }).populate('estudiante', 'nombres apellidos').sort(sort);

        // Calcula el total de ventas
        let totalVentas = 0;
        ventas.forEach((venta) => {
            totalVentas += venta.importe;
        });

        res.json({
            ok: true,
            totalVentas,
            items: ventas,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al generar el informe diario'
        });
    }
};


const getDataforGraph = async (req, res = response) => {
    try {
        // Obtener los datos de ventas desde la base de datos
        const ventas = await PagoEBR.find(); // función que obtiene los datos de ventas

        // Obtener el año y mes actual
        const fechaActual = new Date();
        const anioActual = fechaActual.getFullYear();
        const mesActual = fechaActual.getMonth();

        // Calcular el total de ventas por mes
        const ventasPorMes = {};

        // Inicializar los totales de ventas en 0 para cada mes
        const meses = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ];
        meses.forEach((mes) => {
            ventasPorMes[mes] = 0;
        });

        // Calcular el total de ventas para cada mes
        ventas.forEach((venta) => {
            const ventaAnio = new Date(venta.createdAt).getFullYear();
            const ventaMes = new Date(venta.createdAt).getMonth();
            if (ventaAnio === anioActual) {
                ventasPorMes[meses[ventaMes]] += venta.importe;
            }
        });

        // Crear el array de objetos en el formato deseado
        const data = meses.map((mes) => ({
            mes,
            total: ventasPorMes[mes],
        }));

        return data;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al generar el informe diario',
        });
    }
};


module.exports = {
    generarInformeDiario,
    getDataBetweenDates,
    getDataforGraph,
    getAllReporteERB,
    getAllReporteCEBA,
    getAllReporteRESIDENCIA,
}