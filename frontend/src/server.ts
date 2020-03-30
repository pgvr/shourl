import express from "express"
import compression from "compression"
// eslint-disable-next-line import/no-extraneous-dependencies
import * as sapper from "@sapper/server"
import bodyParser from "body-parser"

const sirv = require("sirv")

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === "development"

express() // You can also use Express
    .use(
        bodyParser.json({ limit: "50mb" }),
        compression({ threshold: 0 }),
        sirv("static", { dev }),
        sapper.middleware(),
    )
    .listen(PORT, () => {})
