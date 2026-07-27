async function authenticateLogin(loginData) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            throw new Error('Invalid Username or Password');
        };

        const data = await response.json();
        return data.data;
    } catch (err) {
        throw err;
    };
};

export default authenticateLogin;