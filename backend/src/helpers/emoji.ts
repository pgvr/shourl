import { EMOJIS, EMOJI_LENGTH } from "./constants"

export default function generateEmojiCombination() {
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
