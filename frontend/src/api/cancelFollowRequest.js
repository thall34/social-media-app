async function cancelFollowRequest(senderId, receiverId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/follow-request/cancel/${senderId}/${receiverId}`,
            {
                method: 'DELETE',
                credentials: 'include',
            },
        );

        if (!response.ok) {
            return null;
        }

        return response;
    } catch(err) {
        return null;
    }
}

export default cancelFollowRequest;