import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import getCurrentUser from '../api/getCurrentUser';
import getCurrentPost from '../api/getCurrentPost';
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
                const error = new Error('Error updating post');
                error.status = 400;
                setError(error);
            };

            navigate('/user/posts');
        } catch (err) {
            setError(err);
        };
    };

    useEffect(() => {
        async function initializePage() {
            try {
                const currentUser = await getCurrentUser();
                const currentPost = await getCurrentPost(postId);
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
        <div className='page'>
            <Header user={user} setError={setError} />
            <main>
                <section className='form'>
                    <form onSubmit={(e) => handleUpdatePost(e)}>
                        <h3>Update Post</h3>
                        <label htmlFor="text">Text: </label>
                        <textarea name='text' id='text' rows={10} cols={50} value={postData.text} onChange={(e) => handleChange(e, setPostData)} />
                        <button type='submit'>Submit Updated Post</button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    )
};

export default UpdatePost;