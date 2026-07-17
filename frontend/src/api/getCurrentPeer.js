async function getCurrentPeer(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/users/peer/${id}`,
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