export default function ensureHttps(url: string) {
    if (!url.includes("http") && !url.includes("https")) {
        return `https://${url}`
    }
    return url
}
