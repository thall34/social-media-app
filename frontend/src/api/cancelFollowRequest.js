import getToken from '../utils/getToken';

async function cancelFollowRequest(receiverId) {
    try {
        const token = getToken();

        if (!token) {
            throw new Error('Token not found');
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/follow-request/cancel/${receiverId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            },
        );

        if (!response.ok) {
            throw new Error('Follow request could not be cancelled')
        }

        return response;
    } catch (err) {
        throw err;
    }
}

export default cancelFollowRequest;