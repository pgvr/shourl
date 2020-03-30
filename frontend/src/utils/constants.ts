export const EMOJIS = ["😀", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉"] // TODO: Add more emojis (e.g. until we have 64)
export const EMOJI_LENGTH = 7
// export const REGEX_EMOJIS = "^[" + EMOJIS.join("") + "]{" + EMOJILENGTH + "}$"
export const REGEX_EMOJIS = `^[${EMOJIS.join("")}]{${EMOJI_LENGTH}}$`
