import getToken from '../utils/getToken';

async function updateProfilePic(formElements) {
    const formData = new FormData(formElements);
    try {
        const token = getToken();

        if (!token) {
            throw new Error('Token not found');
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/picture`, {
            method: 'PUT',
            body: formData,
            headers: {
                    Authorization: `Bearer ${token}`,
            }
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