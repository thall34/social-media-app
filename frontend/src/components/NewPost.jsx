import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import getCurrentUser from '../api/getCurrentUser';
import createNewPost from '../api/createNewPost';
import handleChange from '../utils/handleChange';

function NewPost() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState({
        text: '',
    });

    const navigate = useNavigate();

    async function handleNewPost(e) {
        e.preventDefault();

        try {
            const success = await createNewPost(user.id, postData);
            if (!success) {
                const error = new Error('Error creating post');
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
        <div className='page'>
            <Header user={user} setError={setError} />
            <main>
                <section className='form'>
                    <form onSubmit={(e) => handleNewPost(e)}>
                        <h3>New Post</h3>
                        <label htmlFor="text">Text: </label>
                        <textarea name='text' id='text' rows={10} cols={50} value={postData.text} onChange={(e) => handleChange(e, setPostData)} />
                        <button type='submit'>Submit New Post</button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    )
};

export default NewPost;