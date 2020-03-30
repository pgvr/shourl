const alphabet = ["😀", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉"]
const emojiLength = 5

function getRandomEncodedEmoji() {
    const emoji = alphabet[Math.floor(Math.random() * alphabet.length)]
    return encodeURI(emoji)
}

export function getEncodedEmojiString() {
    const emojis = []
    for (let index = 0; index < emojiLength; index += 1) {
        const emoji = getRandomEncodedEmoji()
        emojis.push(emoji)
    }
    return emojis.join("")
}

// http://www.bizcoder.com/there-is-unicode-in-your-url
// https://en.wikipedia.org/wiki/Emoticons_(Unicode_block)
// https://unicode.org/emoji/charts/full-emoji-list.html
