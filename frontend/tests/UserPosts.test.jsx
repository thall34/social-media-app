import { describe, it, expects } from 'vitest';
import { getByRole, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import UserPosts from '../src/components/UserPosts';
import getCurrentUser from '../src/api/getCurrentUser';
import getAllPostsForUser from '../src/api/getAllPostsForUser';

vi.mock('../src/api/getCurrentUser', () => ({
    default: vi.fn()
}));

vi.mock('../src/api/getAllPostsForUser', () => ({
    default: vi.fn()
}));

const mockUser = {
    id: 1,
    firstName: 'test1',
    lastName: 'test1',
    email: 'example@example.com',
    profilePicFilePath: 'test1.jpg',
    profilePicCloudId: 'test1',
    city: 'test1',
    birthDate: '2000-01-01T00:00:00.000Z',
    createdAt: '2000-01-01T00:00:00.000Z',
    updatedAt: '2000-01-01T00:00:00.000Z',
    posts: [],
    following: [],
    followers: [],
    following_requests: [],
    followed_requests: [],
};

const mockPostFull = {
    id: 1,
    text: 'test post',
    authorId: 1,
    createdAt: '2000-01-01T00:00:00.000Z',
    updatedAt: '2000-01-01T00:00:00.000Z',
    author: {
        firstName: 'test1',
        lastName: 'test1',
        profilePicFilePath: 'test1.jpg',
    },
    comments: [
        {
            id: 1,
            text: 'test comment',
            authorId: 1,
            postId: 1,
            createdAt: '2000-01-01T00:00:00.000Z',
            updatedAt: '2000-01-01T00:00:00.000Z',
            author: {
                firstName: 'test1',
                lastName: 'test1',
                profilePicFilePath: 'test.jpg',
            },
        },
    ],
    likes: [
        {
            userId: 1,
        },
    ],
};

const user = userEvent.setup();

describe('UserPosts component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading while searching for a user', async () => {
        getCurrentUser.mockResolvedValue(mockUser);
        getAllPostsForUser.mockResolvedValue({ data: [mockPostFull] });

        render(
            <MemoryRouter>
                <UserPosts />
            </MemoryRouter>
        )

        const loading = await screen.getByRole('heading', { name: 'Loading...' });
        await waitFor(() => {
            expect(loading).toBeInTheDocument();
        });
    });

    it('renders a basic user homepage with a single post', async () => {
        getCurrentUser.mockResolvedValue(mockUser);
        getAllPostsForUser.mockResolvedValue({ data: [mockPostFull] });
        
        render(
            <MemoryRouter>
                <UserPosts />
            </MemoryRouter>
        )

        const siteHeader = await screen.findByRole('heading', { name: 'BookFace' });
        const userName = await screen.findByRole('heading', { name: 'test1 test1' });
        const postText = await screen.findByText('test post');
        const commentText = await screen.findByText('test comment');
        const siteFooter = await screen.findByText('Copyright © Whitehall Web Development 2026');
        await waitFor(() => {
            expect(siteHeader).toBeInTheDocument();
            expect(userName).toBeInTheDocument();
            expect(postText).toBeInTheDocument();
            expect(commentText).toBeInTheDocument();
            expect(siteFooter).toBeInTheDocument();
        });
    });

    it('renders a non-authenticated page if user is not found', async () => {
        getCurrentUser.mockRejectedValue(null);

        render(
            <MemoryRouter>
                <UserPosts />
            </MemoryRouter>
        )

        const authenticationMessage = await screen.findByRole('heading', { name: 'Not Authenticated' });
        await waitFor(() => {
            expect(authenticationMessage).toBeInTheDocument();
        });
    });
});