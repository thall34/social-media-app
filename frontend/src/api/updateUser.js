async function updateUser(userData) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('User not updated');
        };

        return response.json();
    } catch (err) {
        throw err;
    };
};

export default updateUser;