import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import createUser from "../api/createUser";
import handleChange from '../utils/handleChange';

function RegistrationForm() {
    const [newUserData, setNewUserData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        city: '',
        birthDate: '',
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleRegistration(e) {
        e.preventDefault();

        try {
            const success = await createUser(newUserData);
            if (!success) {
                const error = new Error('Error Registering User');
                error.status = 400;
                setError(error);
                return;
            };

            setNewUserData({
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                city: '',
                birthDate: '',
            });

            navigate('/');
        } catch (err) {
            setError(err);
        };
    };

    if (error) {
        return (
            <div>
                <h1>{error.message}</h1>
                <button onClick={() => setError(null)}>Back to Registration Page</button>
            </div>
        )
    };

    return (
        <div>
            <form onSubmit={handleRegistration}>
                <h1>Register New User</h1>
                <label htmlFor="firstName">First Name: </label>
                <input type="text" name="firstName" id="firstName" value={newUserData.firstName} onChange={(e) => handleChange(e, setNewUserData)} />
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" name="lastName" id="lastName" value={newUserData.lastName} onChange={(e) => handleChange(e, setNewUserData)} />
                <label htmlFor="username">Email: </label>
                <input type="text" name="username" id="username" value={newUserData.username} onChange={(e) => handleChange(e, setNewUserData)} />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={newUserData.password} onChange={(e) => handleChange(e, setNewUserData)} />
                <label htmlFor="city">City (optional): </label>
                <input type="text" name="city" id="city" value={newUserData.city} onChange={(e) => handleChange(e, setNewUserData)} />
                <label htmlFor="birthDate">Date of Birth: </label>
                <input type="date" name="birthDate" id="birthDate" value={newUserData.birthDate} onChange={(e) => handleChange(e, setNewUserData)} />
                <button type="submit">Register User</button>
            </form>
            <Link to='/'>
                <button>Back to Homepage</button>
            </Link>
        </div>
    )
};

export default RegistrationForm;