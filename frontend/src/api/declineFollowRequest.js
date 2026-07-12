async function declineFollowRequest(receiverId, senderId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/follow-request/decline/${receiverId}/${senderId}`,
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

export default declineFollowRequest;