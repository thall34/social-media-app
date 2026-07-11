async function getLikesForPost(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/likes/${id}`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        },
    );

    if (!response.ok) {
        return null;
    };

    const likes = await response.json();
    return likes;
    } catch(err) {
        return null;
    };
};

export default getLikesForPost;