import { Link, useNavigate } from 'react-router';
import deleteUser from '../api/deleteUser';

function Nav({ user, setError }) {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            localStorage.removeItem('jwt-token');
            navigate('/');
        } catch (err) {
            setError(err);
        };
    };

    async function handleDeleteUser() {
        try {
            const success = await deleteUser();
            localStorage.removeItem('jwt-token');
            navigate('/');
        } catch (err) {
            setError(err);
        };
    };

    if (user) {
        return (
            <nav>
                <ul>
                    <Link to='/user/posts'>
                        <li>Home</li>
                    </Link>
                    <Link to='/user/network'>
                        <li>Network</li>
                    </Link>
                    {user.role === 'USER' ? (
                        <>
                            <Link to='/user/update'>
                                <li>Edit User</li>
                            </Link>
                            <li>
                                <button onClick={handleDeleteUser}>Delete User</button>
                            </li>
                        </>
                    ) : (
                        <></>
                    )}
                    <li>
                        <button onClick={handleLogout}>Log Out</button>
                    </li>
                </ul>
            </nav>
        )
    };

    return (
        <nav>
            <ul>
                <Link to='/'>
                    <li>Home</li>
                </Link>
            </ul>
        </nav>
    )
};

export default Nav;