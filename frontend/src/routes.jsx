import App from './components/App';
import RegistrationForm from './components/RegistrationForm';
import NewPost from './components/NewPost';
import UpdatePost from './components/UpdatePost';
import UpdateUser from './components/UpdateUser';
import NewComment from './components/NewComment';
import UpdateComment from './components/UpdateComment';
import UserPosts from './components/UserPosts';
import UserNetwork from './components/UserNetwork';

const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/user/posts',
        element: <UserPosts />
    },
    {
        path: '/user/network',
        element: <UserNetwork />
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