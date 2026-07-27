import getToken from '../utils/getToken';

async function getCurrentPost(id) {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('Token not found');
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Post not found');
    };

    return response.json();
  } catch (err) {
    throw err;
  };
};

export default getCurrentPost;