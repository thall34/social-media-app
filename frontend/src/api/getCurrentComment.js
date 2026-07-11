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
        return null;
      };

      const comment = await response.json();
      return comment;
    } catch (err) {
      return null;
    };
  };

export default getCurrentComment;