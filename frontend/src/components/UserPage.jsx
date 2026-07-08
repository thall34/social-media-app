import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';
import logOutUser from '../api/logOutUser';

function UserPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function handleLogout() {
    try {
        await logOutUser();
        navigate('/');
    } catch(err) {
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
        <Link to='/'>
          <button onClick={() => setError(null)}>Back to Homepage</button>
        </Link>
      </div>
    )
  };

  if (user) {
    return (
      <div>
        <h1>{user.email} successfully logged in!</h1>
        <button onClick={handleLogout}>Log Out</button>
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

export default UserPage;