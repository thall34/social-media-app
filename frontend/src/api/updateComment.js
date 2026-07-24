async function updateComment(commentId, commentData) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/${commentId}`, {
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