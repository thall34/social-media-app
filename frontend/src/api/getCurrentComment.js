async function getCurrentComment(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Comment not found');
      };

      return response.json();
    } catch (err) {
      throw err;
    };
  };

export default getCurrentComment;