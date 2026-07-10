async function createNewPost(userId, postData) {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${userId}`, {
            method: 'POST',
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

export default createNewPost;