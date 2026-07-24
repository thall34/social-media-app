async function updateProfilePic(formElements) {
    const formData = new FormData(formElements);
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/picture`, {
            method: 'PUT',
            body: formData,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Profile pic not updated');
        };

        return response.json();
    } catch (err) {
        throw err;
    };
};

export default updateProfilePic;