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

        // const data = await client.db().collection("posts").findOne({_id: new ObjectId(req.body.id)},(err, data) => {
        //     console.log(data)
        // })

        await client.db().collection("posts").updateOne(
            {
                _id: new ObjectId(req.body.id)
            },
            {
                $push: {
                    comments: {
                        userId: new ObjectId(session?.user.id),
                        createAt: new Date(),
                        comment: req.body.comment,
                        
                    }
                }
            }
        );

        res.json({
            status: "OK",
            id: req.body.id
        });
    } catch (e) {
        console.error(e);
    }
};