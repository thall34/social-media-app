async function cancelFollowRequest(receiverId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/follow-request/cancel/${receiverId}`,
            {
                method: 'DELETE',
                credentials: 'include',
            },
        );

        if (!response.ok) {
            throw new Error('Follow request could not be cancelled')
        }

        return response;
    } catch(err) {
        throw err;
    }
}

export default cancelFollowRequest;