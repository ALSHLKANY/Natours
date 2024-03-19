const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate Field value: "${value}". Try another value!`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((e) => e.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  res.status(err.statusCode).render('error', {
    title: 'Some thing went wrong',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // LOG THE ERROR
    console.error('Error :', err);

    //SENDING GENERIC ERROR
    return res.status(500).json({
      status: 'Error',
      message: 'Somthing went very wrong',
    });
  }
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Some thing went wrong',
      msg: err.message,
    });
  }
  // LOG THE ERROR
  console.error('Error :', err);

  //SENDING GENERIC ERROR
  res.status(err.statusCode).render('error', {
    title: 'Some thing went wrong',
    msg: 'Please try again later',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.create(err);
    // here i used err.name not error.name because error will not have name property
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    else if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    else if (error._message === 'Validation failed')
      error = handleValidationError(error);
    sendErrorProd(error, req, res);
  }
};
