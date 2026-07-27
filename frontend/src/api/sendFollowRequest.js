import getToken from '../utils/getToken';

async function sendFollowRequest(receiverId) {
    try {
        const token = getToken();

        if (!token) {
            throw new Error('Token not found');
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/follow-request/${receiverId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Follow request not sent');
        };

        return response.json();
    } catch (err) {
        throw err;
    };
};

export default sendFollowRequest;