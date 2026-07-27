import getToken from '../utils/getToken';

async function getPeerPoolForPeer(peerId) {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('Token not found');
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/peer/${peerId}/pool`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Peers not found');
    };

    return response.json();
  } catch (err) {
    throw err;
  };
};

export default getPeerPoolForPeer;