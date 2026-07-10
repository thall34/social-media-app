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
        return null;
      };

      const post = await response.json();
      return post;
    } catch (err) {
      return null;
    };
  };

export default getCurrentPost;