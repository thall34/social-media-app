async function authenticateLogin(loginData) {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            credentials: 'include',
        });

        if (!response.ok) {
            return null;
        };

        const data = await response.json();
        return data.user;
    } catch (err) {
        return err;
    };
};

export default authenticateLogin;