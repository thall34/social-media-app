async function getCurrentPost(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`,
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