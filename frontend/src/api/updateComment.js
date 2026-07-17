async function updateComment(commentId, commentData) {
    try {
        const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Comment not updated');
        };

        return response.json();
    } catch (err) {
        throw err;
    };
};

export default updateComment;