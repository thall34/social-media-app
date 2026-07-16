import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import authenticateLogin from '../api/authenticateLogin';
import handleChange from '../utils/handleChange';

function LoginForm({ setError }) {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const user = await authenticateLogin(loginData);
            if (!user) {
                const error = new Error('Error logging in');
                error.status = 400;
                setError(error);
            };

            navigate('/user/posts');
        } catch (err) {
            setError(err);
        };
    };

    return (
        <section className='login'>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <label htmlFor="username">Email: </label>
                <input type="text" name="username" id="username" value={loginData.username} onChange={(e) => handleChange(e, setLoginData)} />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={loginData.password} onChange={(e) => handleChange(e, setLoginData)} />
                <button type="submit">Log In</button>
            </form>
            <Link to='/user/new'>
                <button>Register New User</button>
            </Link>
        </section>
    )
};

export default LoginForm;