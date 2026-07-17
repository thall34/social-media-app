async function deleteUser() {
    try {
        const response = await fetch('http://localhost:3000/api/users/',
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