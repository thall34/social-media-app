async function deleteUser(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`,
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