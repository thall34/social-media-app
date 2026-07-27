import getToken from '../utils/getToken';

async function getCurrentComment(id) {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('Token not found');
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Comment not found');
    };

    return response.json();
  } catch (err) {
    throw err;
  };
};

export default getCurrentComment;