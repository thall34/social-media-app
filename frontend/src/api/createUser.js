async function createUser(formElements) {
    const formData = new FormData(formElements);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('User not created');
        };

        return response.json();
    } catch (err) {
        throw err;
    };
};

export default createUser;