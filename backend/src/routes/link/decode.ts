import express from "express"
import Logger from "../../core/Logger"
import LinkRepo from "../../database/repository/user.repo"
import asyncHandler from "../../helpers/asyncHandler"
import { REGEX_EMOJIS } from "../../helpers/constants"
import ensureHttps from "../../helpers/utils"

const regex = new RegExp(REGEX_EMOJIS, "u")
const router = express.Router()

router.get(
    "/:emojis",
    asyncHandler(async (req, res) => {
        const { emojis } = req.params
        const isEmoji = regex.test(emojis)
        if (isEmoji) {
            const link = await LinkRepo.findByEmoji(encodeURI(emojis))
            if (link) {
                return res.redirect(ensureHttps(link.longUrl))
            }
            Logger.info("No Link found for emojis")
        }
        // TODO: Redirect to our domain
        return res.redirect("https://google.com")
    }),
)

export default router
