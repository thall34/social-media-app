async function deleteComment(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/comments/${id}`,
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