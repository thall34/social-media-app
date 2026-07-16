async function addLikeToPost(postId, userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/likes/${postId}/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            return null;
        };

        return response.json();
    } catch (err) {
        return err;
    };
};

export default addLikeToPost;