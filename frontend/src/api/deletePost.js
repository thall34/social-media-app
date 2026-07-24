async function deletePost(id) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`,
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