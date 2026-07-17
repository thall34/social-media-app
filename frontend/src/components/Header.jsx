import { Link } from 'react-router';
import Nav from './Nav';

function Header({ user, setError }) {
    // if (user) {
        return (
            <header>
                <h1>BookFace</h1>
                <Nav user={user} setError={setError} />
            </header>
        )
    // }

    // return (
    //     <header>
    //         <h1>Bookface</h1>
    //         <Link to='/'>
    //             <p className='home'>Home</p>
    //         </Link>
    //     </header>
    // )
}

export default Header;