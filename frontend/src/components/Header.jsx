import { Link } from 'react-router';
import Nav from './Nav';

function Header({ user, setError }) {
        return (
            <header>
                <h1>BookFace</h1>
                <Nav user={user} setError={setError} />
            </header>
        )
}

export default Header;