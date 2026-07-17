async function deletePost(id, userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}/${userId}`,
            {
                method: 'DELETE',
                credentials: 'include',
            },
        );

        if (!response.ok) {
            throw new Error('Post not deleted');
        }

        return response;
    } catch(err) {
        throw err;
    }
}

export default deletePost;