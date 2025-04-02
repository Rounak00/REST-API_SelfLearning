export default function errorHandler(err, req, res, next) {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Internal Server Error";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
}

// in rakesh tutorial 

import { DEBUG_MODE } from '../config';
import { ValidationError } from 'joi';
import CustomErrorHandler from '../services/CustomErrorHandler';

const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let data = {
        message: 'Internal server error',
        ...(DEBUG_MODE === 'true' && { originalError: err.message })
    }

    if (err instanceof ValidationError) {
        statusCode = 422;
        data = {
            message: err.message
        }
    }

    if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        data = {
            message: err.message
        }
    }

    return res.status(statusCode).json(data);
}

export default errorHandler;
