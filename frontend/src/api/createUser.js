async function createUser(userData) {
    try {
        const response = await fetch('http://localhost:3000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            return null;
        };

        const user = await response.json();
        return user;
    } catch (err) {
        return err;
    };
};

export default createUser;