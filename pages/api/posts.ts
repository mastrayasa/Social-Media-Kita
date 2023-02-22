import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;  
        const posts = await client.db().collection("posts") 
            .find({})
            .sort({ createAt: -1 })
            .limit(100)
            .toArray(); 
        res.json(posts);
    } catch (e) {
        console.error(e);
    }
 }; 