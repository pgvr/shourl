import { Document, model, Schema } from "mongoose"

export const DOCUMENT_NAME = "Link"
export const COLLECTION_NAME = "links"

export default interface Link extends Document {
    longUrl: string
    encodedEmojis: string
    createdAt?: Date
}

const schema = new Schema(
    {
        longUrl: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
        encodedEmojis: {
            type: Schema.Types.String,
            required: true,
            // could enforce true and catch the insert error
            // unique: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
    },
    {
        versionKey: false,
    },
)

export const LinkModel = model<Link>(DOCUMENT_NAME, schema, COLLECTION_NAME)
