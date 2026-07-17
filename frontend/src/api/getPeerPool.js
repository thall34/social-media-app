async function getPeerPool(userId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}/pool`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
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

export default getPeerPool;