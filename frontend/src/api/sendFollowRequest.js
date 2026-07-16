async function sendFollowRequest(senderId, receiverId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/follow-request/${senderId}/${receiverId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            return null;
        };

        return response.json();
    } catch (err) {
        return err;
    };
};

export default sendFollowRequest;