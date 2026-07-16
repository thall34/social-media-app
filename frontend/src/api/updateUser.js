async function updateUser(userId, userData) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
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

export default updateUser;