import express from "express"
import decode from "./link/decode"
import encode from "./link/encode"

const router = express.Router()

router.use("/encode", encode)
router.use("/", decode)

export default router
