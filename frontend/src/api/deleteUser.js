import getToken from '../utils/getToken';

async function deleteUser() {
    try {
        const token = getToken();

        if (!token) {
            throw new Error('Token not found');
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            },
        );

        if (!response.ok) {
            throw new Error('User not deleted');
        }

        return response;
    } catch (err) {
        throw err;
    }
}

export default deleteUser;