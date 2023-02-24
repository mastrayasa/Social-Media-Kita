import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb";

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const session = await getServerSession(req, res, authOptions)
    try {
        const client = await clientPromise;
        
        const newpost = {
            content: req.body.post,
            createAt: new Date(),
            userId: new ObjectId(session?.user.id),
            comments: [],
            likes:[],
        }
        
        await client.db().collection("posts").insertOne(newpost);

        res.json(newpost);
    } catch (e) {
        console.error(e);
    }
 };