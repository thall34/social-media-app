import App from './components/App';
import UserPage from './components/UserPage';
import RegistrationForm from './components/RegistrationForm';
import NewPost from './components/NewPost';
import UpdatePost from './components/UpdatePost';
import UpdateUser from './components/UpdateUser';

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
        path: '/user/update',
        element: <UpdateUser />
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