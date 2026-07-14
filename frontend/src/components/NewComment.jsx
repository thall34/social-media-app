import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';
import createNewComment from '../api/createNewComment';
import handleChange from '../utils/handleChange';

function NewComment() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentData, setCommentData] = useState({
        text: '',
    });

    const navigate = useNavigate();
    const { postId } = useParams();

    async function handleNewComment(e) {
        e.preventDefault();

        try {
            const success = await createNewComment(user.id, postId, commentData);
            if (!success) {
                const error = new Error('Error creating post');
                error.status = 400;
                setError(error);
            };

            navigate('/user/posts');
        } catch(err) {
            setError(err);
        };
    };

    useEffect(() => {
    async function initializePage() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      };
    };

    initializePage();
  }, []);

    return (
        <div>
            <form onSubmit={(e) => handleNewComment(e)}>
                <h3>New Comment</h3>
                <label htmlFor="text">Text: </label>
                <textarea name='text' id='text' rows={3} cols={30} value={commentData.text} onChange={(e) => handleChange(e, setCommentData)}/>
                <button type='submit'>Submit New Comment</button>
            </form>
            <Link to='/user/posts'>
                <button>Back to User Posts</button>
            </Link>
        </div>
    )
};

export default NewComment;