async function getCurrentUser() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`,
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
      throw err;
    };
  };

export default getCurrentUser;