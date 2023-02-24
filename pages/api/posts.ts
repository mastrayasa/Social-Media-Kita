import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const posts = await client.db().collection("posts")
            // .find({})
            .aggregate([
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
            .limit(100)
            .toArray();
        res.json(posts);
    } catch (e) {
        console.error(e);
    }
}; 