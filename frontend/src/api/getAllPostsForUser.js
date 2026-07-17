async function getAllPostsForUser(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/all/${id}`,
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