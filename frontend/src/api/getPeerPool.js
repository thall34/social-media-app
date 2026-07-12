async function getUserPool(userId) {
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
        return null;
      };

      const users = await response.json();
      return users;
    } catch (err) {
      return null;
    };
  };

export default getUserPool;