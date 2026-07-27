import getToken from '../utils/getToken';

async function updatePost(postId, postData) {
    try {
        const token = getToken();

        if (!token) {
            throw new Error('Token not found');
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
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