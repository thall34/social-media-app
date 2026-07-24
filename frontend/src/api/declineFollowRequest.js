async function declineFollowRequest(senderId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/follow-request/decline/${senderId}`,
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