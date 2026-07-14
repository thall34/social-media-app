import { Link } from 'react-router';
import deleteComment from '../api/deleteComment';

function Comment({ userId, postId, comment, setComments, setError }) {

    async function handleDeleteComment(id) {
        try {
            await deleteComment(id, userId);
            setComments((prevComments) => {
                return prevComments.filter((comment) => comment.id !== id);
            });
        } catch (err) {
            setError(err);
        };
    };

    const createdDate = new Date(comment.createdAt);

    return (
        <div className='comment'>
            <div className='comment-details'>
                <span><img src={comment.author.profilePicFilePath} width={25}></img>
                    <p>{comment.author.firstName} {comment.author.lastName}</p>
                    <p>{comment.text}</p>
                    <p>{createdDate.toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                    {comment.authorId === userId ? (
                        <>
                            <Link to={`/user/post/${postId}/comment/${comment.id}/update`}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={() => handleDeleteComment(comment.id)}>X</button>
                        </>
                    ) : (
                        <></>
                    )}
                </span>
            </div>
        </div>
    )
};

export default Comment;