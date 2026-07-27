function getToken() {
    const token = localStorage.getItem('jwt-token');
    if (!token) return null;
    return token;
}

export default getToken;