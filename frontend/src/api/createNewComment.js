async function createNewComment(postId, commentData) {
    try {
        const response = await fetch(`http://localhost:3000/api/comments/post/${postId}`, {
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