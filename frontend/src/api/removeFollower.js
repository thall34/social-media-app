async function removeFollower(receiverId, senderId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/follow/${receiverId}/${senderId}`,
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

export default removeFollower;