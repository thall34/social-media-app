import getToken from '../utils/getToken';

async function deleteComment(id) {
    try {
        const token = getToken();

        if (!token) {
            throw new Error('Token not found');
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            },
        );

        if (!response.ok) {
            throw new Error('Comment not deleted');
        }

        return response;
    } catch (err) {
        throw err;
    }
}

export default deleteComment;