async function createUser(formElements) {
    const formData = new FormData(formElements);

    try {
        const response = await fetch('http://localhost:3000/api/users/', {
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