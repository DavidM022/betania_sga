module.exports = {
    emailConfig: {
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_SEND,
            pass: process.env.EMAIL_PASS,
        },
    }
};
