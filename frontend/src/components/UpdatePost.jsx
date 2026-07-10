import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';
import getCurrentPost from '../api/getCurrentPost'
import updatePost from '../api/updatePost';
import handleChange from '../utils/handleChange';

function UpdatePost() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState({
        text: '',
    });

    const navigate = useNavigate();
    const { postId } = useParams();

    async function handleUpdatePost(e) {
        e.preventDefault();

        try {
            const success = await updatePost(user.id, postId, postData);
            if (!success) {
                const error = new Error('Error creating post');
                error.status = 400;
                setError(error);
            };

            navigate('/user');
        } catch(err) {
            setError(err);
        };
    };

    useEffect(() => {
    async function initializePage() {
      try {
        const currentUser = await getCurrentUser();
        const currentPost = await getCurrentPost(postId);
        console.log(currentPost);
        setUser(currentUser);
        setPostData({ text: currentPost.post.text });
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      };
    };

    initializePage();
  }, []);

    return (
        <form onSubmit={(e) => handleUpdatePost(e)}>
            <h3>Update Post</h3>
            <label htmlFor="text">Text: </label>
            <input type="text" name='text' id='text' value={postData.text} onChange={(e) => handleChange(e, setPostData)}/>
            <button type='submit'>Submit Updated Post</button>
        </form>
    )
};

export default UpdatePost;