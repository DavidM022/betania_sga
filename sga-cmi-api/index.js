const { dbConnection } = require('./database/config');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3001",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true,
        customCssUrl:
            "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
    })
);

// MIDLEWARES

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Rutas

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.redirect('/index.html');
});

app.use('/api/login', require('./routes/auth'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/grados', require('./routes/grados'));
app.use('/api/tipos_activo', require('./routes/tipos_activo'));
app.use('/api/activos', require('./routes/activos'));
app.use('/api/inmobiliarios', require('./routes/inmobiliarios'));
app.use('/api/categoria_uniforme', require('./routes/categoria_uniforme'));
app.use('/api/uniformes', require('./routes/uniformes'));
app.use('/api/docentes', require('./routes/docentes'));
app.use('/api/estudiantes', require('./routes/estudiantes'));
app.use('/api/estudiantes_ebr', require('./routes/estudiantes_ebr'));
app.use('/api/estudiantes_ceba', require('./routes/estudiantes_ceba'));
app.use('/api/estudiantes_residencia', require('./routes/estudiantes_residencia'));
app.use('/api/pagos_ebr', require('./routes/pagos_ebr'));
app.use('/api/pagos_ceba', require('./routes/pagos_ceba'));
app.use('/api/pagos_residencia', require('./routes/pagos_residencia'));
app.use('/api/libros', require('./routes/libros'));
app.use('/api/prestamo_libros', require('./routes/prestamo_libros'));
app.use('/api/mapas', require('./routes/mapas'));
app.use('/api/laboratorios', require('./routes/laboratorios'));
app.use('/api/prestamo_mapas', require('./routes/prestamo_mapas'));
app.use('/api/reportes', require('./routes/reportes'));
app.use('/api/email', require('./routes/sendEmailRoutes'));


app.listen(process.env.PORT, () => {
    console.log('Server is running on port http://localhost:' + process.env.PORT + '/api');
});