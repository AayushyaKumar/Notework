const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
  console.log(err.name,err.message)
    res.status(statusCode).json({
      status,
      message: err.message || 'Internal Server Error',
    });
    
  };
  
  module.exports = errorHandler;
  