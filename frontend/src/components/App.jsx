import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import getCurrentUser from '../api/getCurrentUser';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function initializePage() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          navigate('/user');
        }
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
    navigate('/user')
  };

  return (
    <div>
      <LoginForm setError={setError} />
    </div>
  )
};

export default App;