import Nav from './Nav';

function Header({ user, setError }) {
    if (user) {
        return (
            <header>
                <h1>BookFace</h1>
                <Nav setError={setError} />
            </header>
        )
    }

    return (
        <header>
            <h1>Bookface</h1>
        </header>
    )
}

export default Header;