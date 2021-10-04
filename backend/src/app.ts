import bodyParser from "body-parser"
import cors from "cors"
import express, { NextFunction, Request, Response } from "express"
import { environment } from "./config"
import { ApiError, InternalError, NotFoundError } from "./core/ApiError"
import Logger from "./core/Logger"
import "./database" // initialize database
import routes from "./routes"

process.on("uncaughtException", (e) => {
    Logger.error(e)
})

const app = express()

app.use(bodyParser.json({ limit: "10mb" }))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }))
app.use(cors())

// Routes
app.use("/", routes)

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()))

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // This only runs when an error is found
    if (err instanceof ApiError) {
        return ApiError.handle(err, res)
    }
    if (environment === "development") {
        Logger.error(err)
        return res.status(500).send(err.message)
    }
    return ApiError.handle(new InternalError(), res)
})

export default app
