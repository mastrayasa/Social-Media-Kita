import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb";

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const session = await getServerSession(req, res, authOptions)
    try {
        const client = await clientPromise; 

        const isLike = await client.db().collection("posts").findOne({
            _id: new ObjectId(req.body.id),
            likes: {
                $in: [
                    new ObjectId(session?.user.id)
                ]
              }
        })
        
        if(isLike){
            res.json({status: true});
        }
        
        res.json({status: false});
    } catch (e) {
        console.error(e);
    }
 };