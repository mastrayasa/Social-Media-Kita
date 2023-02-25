import axios from "axios";
 

export default function usePost() {

    const likePost = async (post_id) => {
        //setComplete(false);
        const initialData = {
            id: post_id, 
        };
        await axios
            .post("/api/like", initialData)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
            .then(() => {
                //setComplete(true);
            });
    };

    const isLikePost = async (post_id) => {
        const initialData = {
            id: post_id, 
        };
        let isLIked = false;
        await axios
            .post("/api/like/islike", initialData)
            .then((res) => { 
                isLIked = res.data.status
            })
            .catch((err) => {
                console.log(err);
            })
            .then(() => {
                
            });
        return isLIked;
    };
 

    return {
        likePost, isLikePost
    };
}