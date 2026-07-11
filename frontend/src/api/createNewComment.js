async function createNewComment(userId, postId, commentData) {
    try {
        const response = await fetch(`http://localhost:3000/api/comments/${userId}/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
            credentials: 'include',
        });

        if (!response.ok) {
            return null;
        };

        const comment = await response.json();
        return comment;
    } catch (err) {
        return err;
    };
};

export default createNewComment;