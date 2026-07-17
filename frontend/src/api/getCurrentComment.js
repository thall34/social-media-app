async function getCurrentComment(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/${id}`,
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