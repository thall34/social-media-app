import getToken from '../utils/getToken';

async function createNewComment(postId, commentData) {
    try {
        const token = getToken();

        if (!token) {
            throw new Error('Token not found');
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/post/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(commentData),
        });

        if (!response.ok) {
            throw new Error('Comment not created');
        };

        return response.json();
    } catch (err) {
        throw err;
    };
};

export default createNewComment;