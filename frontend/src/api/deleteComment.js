async function deleteComment(id, userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/comments/${id}/${userId}`,
            {
                method: 'DELETE',
                credentials: 'include',
            },
        );

        if (!response.ok) {
            throw new Error('Comment not deleted');
        }

        return response;
    } catch(err) {
        throw err;
    }
}

export default deleteComment;