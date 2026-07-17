async function removeLikeFromPost(postId, userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/likes/${postId}/${userId}`,
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