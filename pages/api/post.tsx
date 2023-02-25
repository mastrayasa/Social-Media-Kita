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

        const post = await client.db().collection("posts")
            // .find({})
            .aggregate([
                { 
                    '$match': { _id : new ObjectId(newpost._id) } 
                },
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "userId",
                        "foreignField": "_id",
                        "as": "user"
                    }
                },
                {
                    "$unwind": "$user"
                },
                {
                    "$project": {
                      "_id": 1,
                      "content": 1,
                      "createAt": 1,
                      "comments": 1,
                      "user.name": 1,
                      "user.image": 1, 
                    }
                  }
            ])

            .sort({ createAt: -1 })
            .limit(1)
            .toArray();

        res.json(post[0]);
    } catch (e) {
        console.error(e);
    }
 };