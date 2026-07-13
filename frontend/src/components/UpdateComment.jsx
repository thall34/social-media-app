import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';
import getCurrentComment from '../api/getCurrentComment';
import updateComment from '../api/updateComment';
import handleChange from '../utils/handleChange';

function UpdateComment() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentData, setCommentData] = useState({
        text: '',
    });

    const navigate = useNavigate();
    const { commentId } = useParams();

    async function handleUpdateComment(e) {
        e.preventDefault();

        try {
            const success = await updateComment(user.id, commentId, commentData);
            if (!success) {
                const error = new Error('Error updating comment');
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
        const currentComment = await getCurrentComment(commentId);
        setUser(currentUser);
        setCommentData({ text: currentComment.comment.text });
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      };
    };

    initializePage();
  }, []);

    return (
        <form onSubmit={(e) => handleUpdateComment(e)}>
            <h3>Update Comment</h3>
            <label htmlFor="text">Text: </label>
            <input type="text" name='text' id='text' value={commentData.text} onChange={(e) => handleChange(e, setCommentData)}/>
            <button type='submit'>Submit Updated Comment</button>
        </form>
    )
};

export default UpdateComment;