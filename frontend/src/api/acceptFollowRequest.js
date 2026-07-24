async function acceptFollowRequest(senderId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/follow/${senderId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Follow request not sent')
        };

        return response.json();
    } catch (err) {
        throw err;
    };
};

export default acceptFollowRequest;