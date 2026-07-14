async function updateProfilePic(userId, formElements) {
    const formData = new FormData(formElements);
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}/picture`, {
            method: 'PUT',
            body: formData,
            credentials: 'include',
        });

        if (!response.ok) {
            return null;
        };

        const pic = await response.json();
        return pic;
    } catch (err) {
        return err;
    };
};

export default updateProfilePic;