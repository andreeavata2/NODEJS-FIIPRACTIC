const logMiddleware = (req, res, next) => {
    console.log(new Date().toISOString());
    next();
}

const bodyMiddleware = (req, res, next) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        req.body = body;
        next();
    });
}

module.exports = {
    logMiddleware,
    bodyMiddleware
}