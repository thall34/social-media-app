async function getCurrentPeer(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/peer/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Peer not found');
      };

      return response.json();
    } catch (err) {
      throw err;
    };
  };

export default getCurrentPeer;