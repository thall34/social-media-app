import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import getCurrentUser from '../api/getCurrentUser';
import updateProfilePic from '../api/updateProfilePic';

function UpdateProfilePic() {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    async function handleUpdate(e) {
        e.preventDefault();
        const formElement = e.target;

        try {
            setLoading(true);
            const success = await updateProfilePic(user.id, formElement);
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
                setError(err);
            } finally {
                setLoading(false);
            };
        };

        initializePage();
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    };

    if (error) {
        return (
            <div className='page'>
                <Header user={user} setError={setError} />
                <h1>{error.message}</h1>
                <button onClick={() => setError(null)}>Back to Profile Pic Update Page</button>
                <Footer />
            </div>
        )
    };

    if (user) {
        return (
            <div className='page'>
                <Header user={setUser} setError={setError} />
                <main>
                    <section className='form'>
                        <img src={user.profilePicFilePath} className='image preview' />
                        <form onSubmit={handleUpdate} encType='multipart/form-data'>
                            <h1>Update Profile Picture</h1>
                            <label htmlFor="profilePic">Profile Picture: </label>
                            <input type="file" name="profilePic" id="profilePic" className='file'/>
                            <button type='submit'>Submit Update</button>
                        </form>
                    </section>
                </main>
                <Footer />
            </div>
        )
    };

    return (
        <div>
            <h1>Not Authenticated</h1>
            <Link to='/'>
                <button>Go to Homepage</button>
            </Link>
        </div>
    )
};

export default UpdateProfilePic;