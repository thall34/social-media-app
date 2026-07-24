async function createNewComment(postId, commentData) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/post/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Comment not created');
        };

        return response.json();
    } catch (err) {
        throw err;
    };
};

export default createNewComment;