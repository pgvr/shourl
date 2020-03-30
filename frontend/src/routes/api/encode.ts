/* eslint-disable @typescript-eslint/no-use-before-define */
import { Request, Response } from "express"
import { db } from "../../utils/admin"
import { EMOJIS, EMOJI_LENGTH } from "../../utils/constants"

export async function post(req: Request, res: Response) {
    console.log(req.body)
    const { longUrl } = req.body

    if (longUrl) {
        try {
            console.log("putting in db")
            const emojis = await storeUrl(longUrl)
            return res.json({ emojis })
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    } else {
        console.log("400")
        return res.sendStatus(400)
    }
}

async function storeUrl(longUrl: string) {
    const emojiCombination = generateEmojiCombination()
    const link = {
        encodedEmojis: encodeURI(emojiCombination),
        longUrl,
    }
    await db.collection("links").add(link)
    return emojiCombination
}

function generateEmojiCombination() {
    const emojis = []
    for (let index = 0; index < EMOJI_LENGTH; index += 1) {
        const emoji = getRandomEncodedEmoji()
        emojis.push(emoji)
    }
    return emojis.join("")
}

function getRandomEncodedEmoji() {
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
    return emoji
}
