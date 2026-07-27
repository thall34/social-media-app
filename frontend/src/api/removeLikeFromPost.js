import getToken from '../utils/getToken';

async function removeLikeFromPost(postId) {
    try {
        const token = getToken();

        if (!token) {
            throw new Error('Token not found');
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/likes/${postId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            },
        );

        if (!response.ok) {
            throw new Error('Like could not be removed from post');
        }

        return response;
    } catch (err) {
        throw err;
    }
}

export default removeLikeFromPost;