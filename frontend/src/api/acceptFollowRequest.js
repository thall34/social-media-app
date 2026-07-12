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
            return null;
        };

        const success = await response.json();
        return success;
    } catch (err) {
        return err;
    };
};

export default acceptFollowRequest;