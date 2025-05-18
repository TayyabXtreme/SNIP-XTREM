

export const errorHandler = (err, req, res, next) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    console.error(err);

    res.status(500).json({
        success: false,
        status: 'error',
        message: err.message    
    })

}

export class AppError extends Error{
    statusCode;
    isOperational;
    status; 

    constructor(message, statusCode=500,isOperational=true){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError{
    constructor(message="Resource not fo und"){
        super(message, 404);
    }
} 

export class ConflictError extends AppError{
    constructor(message="Conflict error"){
        super(message, 409);
    }
}

export class BadRequestError extends AppError{
    constructor(message="Bad request"){
        super(message, 400);
    }
}

export class UnauthorizedError extends AppError{
    constructor(message="Unauthorized"){
        super(message, 401);
    }
}