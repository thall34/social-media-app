import App from './components/App';
import UserPage from './components/UserPage';
import RegistrationForm from './components/RegistrationForm';

const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/user',
        element: <UserPage />
    },
    {
        path: '/user/new',
        element: <RegistrationForm />
    }
];

export default routes;