async function deleteUser(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`,
            {
                method: 'DELETE',
                credentials: 'include',
            },
        );

        if (!response.ok) {
            return null;
        }

        return response;
    } catch(err) {
        return null;
    }
}

export default deleteUser;