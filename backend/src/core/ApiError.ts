/* eslint-disable max-classes-per-file */
import { Response } from "express"
import { environment } from "../config"
import { InternalErrorResponse, BadRequestResponse, NotFoundResponse } from "./ApiResponse"

enum ErrorType {
    BAD_REQUEST = "BadRequestError",
    INTERNAL = "InternalError",
    NOT_FOUND = "NotFoundError",
}

export abstract class ApiError extends Error {
    constructor(public type: ErrorType, public message: string = "error") {
        super(type)
    }

    public static handle(err: ApiError, res: Response): Response {
        switch (err.type) {
            case ErrorType.INTERNAL:
                return new InternalErrorResponse(err.message).send(res)
            case ErrorType.BAD_REQUEST:
                return new BadRequestResponse(err.message).send(res)
            case ErrorType.NOT_FOUND:
                return new NotFoundResponse(err.message).send(res)
            default: {
                let { message } = err
                // Do not send failure message in production as it may send sensitive data
                if (environment === "production") message = "Something wrong happened."
                return new InternalErrorResponse(message).send(res)
            }
        }
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string = "Bad Request") {
        super(ErrorType.BAD_REQUEST, message)
    }
}

export class InternalError extends ApiError {
    constructor(message: string = "Internal error") {
        super(ErrorType.INTERNAL, message)
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string = "Not Found") {
        super(ErrorType.NOT_FOUND, message)
    }
}
