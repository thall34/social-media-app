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
        return null;
      };

      return response.json();
    } catch (err) {
      return null;
    };
  };

export default getAllPostsForUser;