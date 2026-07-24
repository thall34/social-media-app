async function removeLikeFromPost(postId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/likes/${postId}`,
            {
                method: 'DELETE',
                credentials: 'include',
            },
        );

        if (!response.ok) {
            throw new Error('Like could not be removed from post');
        }

        return response;
    } catch(err) {
        throw err;
    }
}

export default removeLikeFromPost;