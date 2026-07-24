async function createNewPost(postData) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Post not created');
        };

        return response.json();
    } catch (err) {
        throw err;
    };
};

export default createNewPost;