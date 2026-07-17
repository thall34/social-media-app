async function updateUser(userData) {
    try {
        const response = await fetch('http://localhost:3000/api/users/', {
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