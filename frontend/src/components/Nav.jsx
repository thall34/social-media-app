import { Link, useNavigate } from 'react-router';
import logOutUser from '../api/logOutUser';

function Nav({ setError }) {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logOutUser();
            navigate('/');
        } catch (err) {
            setError(err);
        };
    };

    return (
        <nav>
            <ul>
                <Link to='/user/posts'>
                    <li>Home</li>
                </Link>
                <Link to='/user/network'>
                    <li>Network</li>
                </Link>
                <Link to='/user/update'>
                    <li>Edit User</li>
                </Link>
                <li>
                    <button onClick={handleLogout}>Log Out</button>
                </li>
            </ul>
        </nav>
    )
};

export default Nav;