async function updateComment(userId, commentId, commentData) {
    try {
        const response = await fetch(`http://localhost:3000/api/comments/${commentId}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
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

export default updateComment;