import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';
import updateUser from '../api/updateUser';
import handleChange from '../utils/handleChange';
import formatBirthday from '../utils/formatBirthday';

function UpdateUser() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        city: '',
        birthDate: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const navigate = useNavigate();

    async function handleUpdate(e) {
        e.preventDefault();

        try {
            const success = await updateUser(user.id, userData);
            if (!success) {
                const error = new Error('Error Updating User');
                error.status = 400;
                setError(error);
                return;
            };

            setUserData({
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                city: '',
                birthDate: '',
            });

            navigate('/user');
        } catch (err) {
            setError(err);
        };
    };

    useEffect(() => {
    async function initializePage() {
      try {
        const currentUser = await getCurrentUser();
        const birthDate = currentUser.birthDate.split('T')[0];
        setUser(currentUser);
        setUserData({
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            username: currentUser.email,
            password: '',
            city: currentUser.city,
            birthDate: birthDate,
        });
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      };
    };

    initializePage();
  }, []);

    if (error) {
        return (
            <div>
                <h1>{error.message}</h1>
                <button onClick={() => setError(null)}>Back to User Update Page</button>
            </div>
        )
    };

    return (
        <div>
            <form onSubmit={handleUpdate}>
                <h1>Update User</h1>
                <label htmlFor="firstName">First Name: </label>
                <input type="text" name="firstName" id="firstName" value={userData.firstName} onChange={(e) => handleChange(e, setUserData)} />
                <label htmlFor="lastName">First Name: </label>
                <input type="text" name="lastName" id="lastName" value={userData.lastName} onChange={(e) => handleChange(e, setUserData)} />
                <label htmlFor="username">Email: </label>
                <input type="text" name="username" id="username" value={userData.username} onChange={(e) => handleChange(e, setUserData)} />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={userData.password} onChange={(e) => handleChange(e, setUserData)} placeholder='Leave blank to keep old password'/>
                <label htmlFor="city">City (optional): </label>
                <input type="text" name="city" id="city" value={userData.city} onChange={(e) => handleChange(e, setUserData)} />
                <label htmlFor="birthDate">Date of Birth: </label>
                <input type="date" name="birthDate" id="birthDate" value={userData.birthDate} onChange={(e) => handleChange(e, setUserData)} />
                <button type="submit">Update User</button>
            </form>
            <Link to='/user'>
                <button>Back to User Page</button>
            </Link>
        </div>
    )
};

export default UpdateUser;