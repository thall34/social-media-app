import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Header from './Header';
import Footer from './Footer';
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
        const formElements = e.target;

        try {
            const success = await createUser(formElements);
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
            <div className='page'>
                <Header setError={setError} />
                <h1>{error.message}</h1>
                <button onClick={() => setError(null)}>Back to Registration Page</button>
                <Footer />
            </div>
        )
    };

    return (
        <div className='page'>
            <Header user={null} setError={setError} />
            <main>
                <section className='form'>
                    <form onSubmit={handleRegistration} encType='multipart/form-data'>
                        <h1>Register New User</h1>
                        <label htmlFor="firstName">First Name: </label>
                        <input type="text" name="firstName" id="firstName" value={newUserData.firstName} onChange={(e) => handleChange(e, setNewUserData)} />
                        <label htmlFor="lastName">Last Name: </label>
                        <input type="text" name="lastName" id="lastName" value={newUserData.lastName} onChange={(e) => handleChange(e, setNewUserData)} />
                        <label htmlFor="username">Email: </label>
                        <input type="text" name="username" id="username" value={newUserData.username} onChange={(e) => handleChange(e, setNewUserData)} />
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" value={newUserData.password} onChange={(e) => handleChange(e, setNewUserData)} />
                        <label htmlFor="profilePic">Profile Picture (optional): </label>
                        <input type="file" name="profilePic" id="profilePic" className='file' />
                        <label htmlFor="city">City (optional): </label>
                        <input type="text" name="city" id="city" value={newUserData.city} onChange={(e) => handleChange(e, setNewUserData)} />
                        <label htmlFor="birthDate">Date of Birth: </label>
                        <input type="date" name="birthDate" id="birthDate" value={newUserData.birthDate} onChange={(e) => handleChange(e, setNewUserData)} />
                        <button type="submit">Register User</button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    )
};

export default RegistrationForm;