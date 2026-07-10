import App from './components/App';
import UserPage from './components/UserPage';
import RegistrationForm from './components/RegistrationForm';
import NewPost from './components/NewPost';
import UpdatePost from './components/UpdatePost';

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
    },
    {
        path: '/user/post/new',
        element: <NewPost />
    },
    {
        path: '/user/post/update/:postId',
        element: <UpdatePost />
    },
];

export default routes;