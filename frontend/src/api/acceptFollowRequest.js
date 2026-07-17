async function acceptFollowRequest(receiverId, senderId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/follow/${receiverId}/${senderId}`, {
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