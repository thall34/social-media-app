async function getCurrentUser() {
    try {
      const response = await fetch(
        'http://localhost:3000/api/users/me',
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

export default getCurrentUser;