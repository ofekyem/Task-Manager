function errorHandler(err, req, res, next) {
    console.error(err); 
    const status = err.status || 500;
    const message = err.message || "Oops, server error";
    res.status(status).json({ error: { status, message } });
} 

module.exports = errorHandler;