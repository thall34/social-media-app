import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
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
            if (!success) {
                const error = new Error('Error Updating Profile Picture');
                error.status = 400;
                setError(error);
                return;
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

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    };

    if (error) {
        return (
            <div>
                <h1>{error.message}</h1>
                <button onClick={() => setError(null)}>Back to User Update Page</button>
            </div>
        )
    };

    if (user) {
        return (
            <div>
                <img src={user.profilePicFilePath} width={200}></img>
                <form onSubmit={handleUpdate} encType='multipart/form-data'>
                    <h1>Update Profile Picture</h1>
                    <label htmlFor="profilePic">Profile Picture: </label>
                    <input type="file" name="profilePic" id="profilePic" />
                    <button type='submit'>Submit Update</button>
                </form>
                <Link to='/user/posts'>
                    <button>Back to User Page</button>
                </Link>
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