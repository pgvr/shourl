import Link, { LinkModel } from "../model/link.model"

export default class LinkRepo {
    public static findByEmoji(encodedEmojis: string): Promise<Link> {
        return LinkModel.findOne({ encodedEmojis }).lean<Link>().exec()
    }

    public static findByLongUrl(longUrl: string): Promise<Link> {
        return LinkModel.findOne({ longUrl }).lean<Link>().exec()
    }

    public static async create(link: Link): Promise<Link> {
        const now = new Date()
        const dbLink = <Link>{ ...link, createdAt: now }
        const createdLink = await LinkModel.create(dbLink)
        return createdLink
    }
}
