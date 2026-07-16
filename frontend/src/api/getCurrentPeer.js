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
        return null;
      };

      return response.json();
    } catch (err) {
      return null;
    };
  };

export default getCurrentPeer;