import getToken from '../utils/getToken';

async function addLikeToPost(postId) {
    try {
        const token = getToken();

        if (!token) {
            throw new Error('Token not found');
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/likes/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Like not added to post')
        };

        return response.json();
    } catch (err) {
        throw err;
    };
};

export default addLikeToPost;