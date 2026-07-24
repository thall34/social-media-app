async function getPostsForPeer(peerId) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/peer/${peerId}`,
        {
          headers: {
            'Content-Type': 'application/json',
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