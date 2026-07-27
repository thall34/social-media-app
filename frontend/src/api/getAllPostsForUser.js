import getToken from "../utils/getToken";

async function getAllPostsForUser() {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/all`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Posts not found');
    };

    return response.json();
  } catch (err) {
    throw err;
  };
};

export default getAllPostsForUser;