async function deletePost(id, userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}/${userId}`,
            {
                method: 'DELETE',
                credentials: 'include',
            },
        );

        if (!response.ok) {
            return null;
        }

        return response;
    } catch(err) {
        return null;
    }
}

export default deletePost;