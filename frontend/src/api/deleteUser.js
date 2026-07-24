async function deleteUser() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/`,
            {
                method: 'DELETE',
                credentials: 'include',
            },
        );

        if (!response.ok) {
            throw new Error('User not deleted');
        }

        return response;
    } catch(err) {
        throw err;
    }
}

export default deleteUser;