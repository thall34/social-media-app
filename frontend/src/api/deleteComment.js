async function deleteComment(id) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/${id}`,
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