const multer = require('multer');

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Directorio donde se guardarán los archivos
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        // Nombre del archivo
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // Tamaño máximo del archivo (5MB en este ejemplo)
    },
    fileFilter: function (req, file, cb) {
        // Validar el tipo de archivo permitido (solo pdf en este ejemplo)
        // if (file.mimetype !== 'application/pdf') {
        //     return cb(new Error('Solo se permiten archivos PDF'));
        // }
        cb(null, true);
    },
});

module.exports = upload;

