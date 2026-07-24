async function addLikeToPost(postId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/likes/${postId}`, {
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