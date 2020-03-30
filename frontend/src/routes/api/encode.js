import { db } from "../../utils/admin"
import { EMOJIS, EMOJILENGTH, REGEX_URL } from "../../utils/constants"

export async function post(req, res, next) {
    const { longUrl } = req.body
    // regex for URL check
    // const regexUrl = new RegExp(REGEX_URL)

    if (longUrl) {
        try {
            const emojis = await storeUrl(longUrl)
            return res.json({ emojis })
        } catch (error) {
            return res.status(500)
        }
    } else {
        return res.status(400)
    }
}

async function storeUrl(longUrl) {
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
    for (let index = 0; index < EMOJILENGTH; index += 1) {
        const emoji = getRandomEncodedEmoji()
        emojis.push(emoji)
    }
    return emojis.join("")
}

function getRandomEncodedEmoji() {
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
    return emoji
}
