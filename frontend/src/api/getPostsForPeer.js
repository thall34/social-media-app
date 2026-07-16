async function getPostsForPeer(peerId) {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/peer/${peerId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        return null;
      };

      return response.json();
    } catch (err) {
      return null;
    };
  };

export default getPostsForPeer;