async function removeFollower(senderId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/follow/${senderId}`,
            {
                method: 'DELETE',
                credentials: 'include',
            },
        );

        if (!response.ok) {
            throw new Error('Follower could not be removed');
        }

        return response;
    } catch(err) {
        throw err;
    }
}

export default removeFollower;