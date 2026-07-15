async function getPeerPoolForPeer(userId, peerId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/peer/${peerId}/pool`,
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

      const users = await response.json();
      return users;
    } catch (err) {
      return null;
    };
  };

export default getPeerPoolForPeer;