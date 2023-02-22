import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const session = await getServerSession(req, res, authOptions)
    try {
        const client = await clientPromise;
        
        const data = {
            content: req.body.post,
            createAt: new Date(),
            userId: "fsdfsdf"
        }
        await client.db().collection("posts").insertOne(data);
        res.json(data);
    } catch (e) {
        console.error(e);
    }
 };