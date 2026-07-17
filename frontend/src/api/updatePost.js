async function updatePost(postId, postData) {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Post not updated');
        };

        return response.json();
    } catch (err) {
        throw err;
    };
};

export default updatePost;