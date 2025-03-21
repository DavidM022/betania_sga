const express = require('express');
const router = express.Router();
const emailController = require('../controllers/sendEmailController');
const upload = require('../middlewares/multer');

router.post('/send',  upload.single('file'), emailController.sendEmailWithAttachment);

module.exports = router;