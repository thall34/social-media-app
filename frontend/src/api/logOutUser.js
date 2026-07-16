async function logOutUser() {
    try {
        const response = await fetch('http://localhost:3000/api/users/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            return null;
        };

        return response;
    } catch(err) {
        return null;
    };
};

export default logOutUser;