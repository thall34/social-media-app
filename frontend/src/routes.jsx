import App from './components/App';
import RegistrationForm from './components/RegistrationForm';

const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/user/new',
        element: <RegistrationForm />
    }
];

export default routes;