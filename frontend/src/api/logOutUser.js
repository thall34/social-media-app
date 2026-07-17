async function logOutUser() {
    try {
        const response = await fetch('http://localhost:3000/api/users/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Could not log out user');
        };

        return response;
    } catch(err) {
        throw err;
    };
};

export default logOutUser;