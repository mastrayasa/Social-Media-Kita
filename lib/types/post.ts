import { CommentType } from "./comment"
import { UserType } from "./user"

export type PostType = {
    _id: string,
    createAt: string,
    image: string,
    content: string,
    likes: Array<any>,
    comments: Array<CommentType>,
    user: UserType
}