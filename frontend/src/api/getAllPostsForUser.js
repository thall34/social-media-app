async function getAllPostsForUser() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/all`,
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

export default getAllPostsForUser;