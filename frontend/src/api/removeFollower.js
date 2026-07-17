async function removeFollower(senderId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/follow/${senderId}`,
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