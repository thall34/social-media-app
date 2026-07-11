import App from './components/App';
import UserPage from './components/UserPage';
import RegistrationForm from './components/RegistrationForm';
import NewPost from './components/NewPost';
import UpdatePost from './components/UpdatePost';
import UpdateUser from './components/UpdateUser';
import NewComment from './components/NewComment';
import UpdateComment from './components/UpdateComment';

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
        path: '/user/post/:postId/update',
        element: <UpdatePost />
    },
    {
        path: '/user/post/:postId/comment/new',
        element: <NewComment />
    },
    {
        path: '/user/post/:postId/comment/:commentId/update',
        element: <UpdateComment />
    },
];

export default routes;