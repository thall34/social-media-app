async function logOutUser() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
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