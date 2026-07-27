import getToken from '../utils/getToken';

async function getCurrentUser() {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('Token not found');
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      localStorage.removeItem('token');
      return null;
    };

    return response.json();
  } catch (err) {
    throw err;
  };
};

export default getCurrentUser;