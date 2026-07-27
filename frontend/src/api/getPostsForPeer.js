import getToken from '../utils/getToken';

async function getPostsForPeer(peerId) {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('Token not found');
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/peer/${peerId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
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

export default getPostsForPeer;