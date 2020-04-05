import express from "express"
import encode from "./link/encode"
import decode from "./link/decode"

const router = express.Router()

router.use("/encode", encode)
router.use("/decode", decode)

export default router
