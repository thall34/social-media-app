import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Post from '../src/components/Post';
import addLikeToPost from '../src/api/addLikeToPost';
import removeLikeFromPost from '../src/api/removeLikeFromPost';
import deletePost from '../src/api/deletePost';

// mocks for api calls
vi.mock('../src/api/addLikeToPost', () => ({
    default: vi.fn()
}));

vi.mock('../src/api/removeLikeFromPost', () => ({
    default: vi.fn()
}));

vi.mock('../src/api/deletePost', () => ({
    default: vi.fn()
}));

// mock post details to render the Post component
const mockPostBasic = {
    id: 1,
    text: 'test',
    authorId: 1,
    createdAt: '2000-01-01T00:00:00.000Z',
    updatedAt: '2000-01-01T00:00:00.000Z',
    author: {
        firstName: 'test',
        lastName: 'test',
        profilePicFilePath: 'test.jpg',
    },
    comments: [],
    likes: [],
};

// mock post details with a comment and a like to render the Post component
const mockPostFull = {
    id: 1,
    text: 'test',
    authorId: 1,
    createdAt: '2000-01-01T00:00:00.000Z',
    updatedAt: '2000-01-01T00:00:00.000Z',
    author: {
        firstName: 'test1',
        lastName: 'test1',
        profilePicFilePath: 'test.jpg',
    },
    comments: [
        {
            id: 1,
            text: 'test',
            authorId: 1,
            postId: 1,
            createdAt: '2000-01-01T00:00:00.000Z',
            updatedAt: '2000-01-01T00:00:00.000Z',
            author: {
                firstName: 'test2',
                lastName: 'test2',
                profilePicFilePath: 'test.jpg',
            },
        },
    ],
    likes: [
        {
            userId: 2,
        },
    ],
};

// mock functions for post
const mockSetPosts = vi.fn();
const mockSetError = vi.fn();
// user event setup
const user = userEvent.setup();

describe('Post component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders a basic post element with no comments', () => {
        // render the Post component, needs memory router as it is in a React Router environment
        render(
            <MemoryRouter>
                <Post userId={1} post={mockPostBasic} setPosts={mockSetPosts} setError={mockSetError} />
            </MemoryRouter>
        );
        // gets author name element, post text element, like count button, and heading element
        const authorName = screen.getByText('test test');
        const postText = screen.getByText('test');
        const likeCount = screen.getByText('Likes 👍: 0');
        const noComments = screen.getByText('No Comments Yet');
        // makes sure these elements exist in the document
        expect(authorName).toBeInTheDocument();
        expect(postText).toBeInTheDocument();
        expect(likeCount).toBeInTheDocument();
        expect(noComments).toBeInTheDocument();
    });

    it('renders comments and likes when the post has them', () => {
        // render the Post component, needs memory router as it is in a React Router environment
        render(
            <MemoryRouter>
                <Post userId={1} post={mockPostFull} setPosts={mockSetPosts} setError={mockSetError} />
            </MemoryRouter>
        );
        // gets edit post, delete post, edit comment and delete comment buttons
        const editPostButton = screen.getByRole('button', { name: 'Edit Post'})
        const deletePostButton = screen.getByRole('button', { name: 'Delete Post'});
        const editCommentButton = screen.getByRole('button', { name: 'Edit'})
        const deleteCommentButton = screen.getByRole('button', { name: 'X'});
        // makes sure these elements exist in the document
        expect(editPostButton).toBeInTheDocument();
        expect(deletePostButton).toBeInTheDocument();
        expect(editCommentButton).toBeInTheDocument();
        expect(deleteCommentButton).toBeInTheDocument();
    });

    it('renders edit and delete button on post and comment that the user is the author of', () => {
        // render the Post component, needs memory router as it is in a React Router environment
        render(
            <MemoryRouter>
                <Post userId={1} post={mockPostFull} setPosts={mockSetPosts} setError={mockSetError} />
            </MemoryRouter>
        );
        // gets like count with a value of 1, and comment author
        const likeCount = screen.getByText('Likes 👍: 1');
        const commentAuthor = screen.getByText('test2 test2');
        // makes sure these elements exist in the document
        expect(likeCount).toBeInTheDocument();
        expect(commentAuthor).toBeInTheDocument();
    });

    it('successfully calls addLikeToPost on clicking like button and updates the like counter', async () => {
        // render the Post component, needs memory router as it is in a React Router environment
        addLikeToPost.mockResolvedValue({
            data: {
                userId: 2
            },
        });
        render(
            <MemoryRouter>
                <Post userId={1} post={mockPostFull} setPosts={mockSetPosts} setError={mockSetError} />
            </MemoryRouter>
        );
        // gets the like button which in this setup should say like
        const likeButton = screen.getByRole('button', { name: 'Like' });
        // user clicks the like button
        await user.click(likeButton);
        // gets like count button which will have incremented up by 1
        const likeCount = screen.getByText('Likes 👍: 2');
        // makes sure the functions have been called correctly and the like count is in the document
        await waitFor(() => {
            expect(addLikeToPost).toHaveBeenCalledTimes(1);
            expect(addLikeToPost).toHaveBeenCalledWith(1)
            expect(likeCount).toBeInTheDocument();
        });
    });

    it('successfully calls removeLikeFromPost on clicking liked button and updates the like counter', async () => {
        // render the Post component, needs memory router as it is in a React Router environment
        removeLikeFromPost.mockResolvedValue({
            data: {
                userId: 2
            },
        });
        render(
            <MemoryRouter>
                <Post userId={2} post={mockPostFull} setPosts={mockSetPosts} setError={mockSetError} />
            </MemoryRouter>
        );
        // gets the like button which in this setup should say liked
        const likeButton = screen.getByRole('button', { name: 'Liked 👍' });
        // user clicks the like button
        await user.click(likeButton);
        // gets like count element which should have decremented down by 1
        const likeCount = screen.getByText('Likes 👍: 0');
        // makes sure the functions have been called correctly and the like count is in the document
        await waitFor(() => {
            expect(removeLikeFromPost).toHaveBeenCalledTimes(1);
            expect(removeLikeFromPost).toHaveBeenCalledWith(1);
            expect(likeCount).toBeInTheDocument();
        });
    });

    it('successfully calls deletePost on clicking delete button', async () => {
        // render the Post component, needs memory router as it is in a React Router environment
        deletePost.mockResolvedValue();
        render(
            <MemoryRouter>
                <Post userId={1} post={mockPostFull} setPosts={mockSetPosts} setError={mockSetError} />
            </MemoryRouter>
        );
        // gets the delete button element
        const deleteButton = screen.getByRole('button', { name: 'Delete Post' });
        // user clicks the delete button
        await user.click(deleteButton);
        // makes sure the delete function was called correctly
        await waitFor(() => {
            expect(deletePost).toHaveBeenCalledTimes(1);
            expect(deletePost).toHaveBeenCalledWith(1);
        });
    });
});