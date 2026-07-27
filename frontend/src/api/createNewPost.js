import getToken from '../utils/getToken';

async function createNewPost(postData) {
    try {

        const token = getToken();

        if (!token) {
            throw new Error('Token not found');
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
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