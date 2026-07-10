async function updatePost(userId, postId, postData) {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
            credentials: 'include',
        });

        if (!response.ok) {
            return null;
        };

        const post = await response.json();
        return post;
    } catch (err) {
        return err;
    };
};

export default updatePost;