import express from "express"
import { SuccessResponse } from "../../core/ApiResponse"
import Logger from "../../core/Logger"
import Link from "../../database/model/link.model"
import LinkRepo from "../../database/repository/user.repo"
import asyncHandler from "../../helpers/asyncHandler"
import generateEmojiCombination from "../../helpers/emoji"

const router = express.Router()

/**
 * Receive Long Url, encode it and write to db
 */
router.post(
    "/",
    asyncHandler(async (req, res) => {
        Logger.info("Starting encode")
        // TODO: Add body validation
        const { longUrl } = req.body

        const emojiCombination = generateEmojiCombination()
        const link = <Link>{
            encodedEmojis: encodeURI(emojiCombination),
            longUrl,
        }
        const createdLink = await LinkRepo.create(link)
        Logger.info("Done encoding")
        return new SuccessResponse<Link>("success", createdLink).send(res)
    }),
)

export default router
