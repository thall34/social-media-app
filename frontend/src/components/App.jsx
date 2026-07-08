import { useState, useEffect } from 'react'
import { Link } from 'react-router';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import getCurrentUser from '../api/getCurrentUser';

function App() {
  // const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function initializePage() {
  //     try {
  //       const currentUser = await getCurrentUser();
  //       setUser(currentUser);
  //     } catch (err) {
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     };
  //   };

  //   initializePage();
  // }, []);

  // if (loading) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   )
  // };

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

  // if (user) {
  //   return (
  //     <div>
  //       <h1>{user.email} successfully logged in!</h1>
  //       <Link to='/user'>
  //         <button>Go to User Dashboard</button>
  //       </Link>
  //     </div>
  //   )
  // };

  return (
    <div>
      {/* <LoginForm setUser={setUser} setError={setError} /> */}
      <LoginForm setError={setError} />
    </div>
  )
};

export default App;