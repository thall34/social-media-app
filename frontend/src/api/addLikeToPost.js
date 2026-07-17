async function addLikeToPost(postId) {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/likes/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Like not added to post')
        };

        return response.json();
    } catch (err) {
        throw err;
    };
};

export default addLikeToPost;