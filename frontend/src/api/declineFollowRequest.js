async function declineFollowRequest(receiverId, senderId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/follow-request/decline/${receiverId}/${senderId}`,
            {
                method: 'DELETE',
                credentials: 'include',
            },
        );

        if (!response.ok) {
            throw new Error('Follow request could not be declined');
        }

        return response;
    } catch(err) {
        throw err;
    }
}

export default declineFollowRequest;