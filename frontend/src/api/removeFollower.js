import getToken from '../utils/getToken';

async function removeFollower(senderId) {
    try {
        const token = getToken();

        if (!token) {
            throw new Error('Token not found');
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/follow/${senderId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            },
        );

        if (!response.ok) {
            throw new Error('Follower could not be removed');
        }

        return response;
    } catch (err) {
        throw err;
    }
}

export default removeFollower;