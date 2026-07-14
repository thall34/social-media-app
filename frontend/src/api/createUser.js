async function createUser(formElements) {
    const formData = new FormData(formElements);
    try {
        const response = await fetch('http://localhost:3000/api/users/', {
            method: 'POST',
            body: formData,
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