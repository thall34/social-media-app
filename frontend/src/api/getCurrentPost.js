async function getCurrentPost(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Post not found');
      };

      return response.json();
    } catch (err) {
      throw err;
    };
  };

export default getCurrentPost;