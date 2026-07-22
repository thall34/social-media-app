import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import LoginForm from '../src/components/LoginForm';
import authenticateLogin from '../src/api/authenticateLogin';

// mock the authenticateLogin function
vi.mock('../src/api/authenticateLogin', () => ({
    default: vi.fn()
}));

const mockNavigate = vi.fn();
const mockSetError = vi.fn();
const user = userEvent.setup();

vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');

    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Login Form component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders a form with a username and password', () => {
        // render the loginForm component, needs memory router as it is in a React Router environment
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        // gets form, username input field, and password input field
        const form = screen.getByRole('form', { name: /login-form/i });
        const username = screen.getByLabelText(/email/i);
        const password = screen.getByLabelText(/password/i);
        // makes sure these elements exist in the document
        expect(form).toBeInTheDocument();
        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
    });

    it('should accept user input', async () => {
        // render the loginForm component, needs memory router as it is in a React Router environment
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        // get username input and password input fields
        const username = screen.getByLabelText(/email/i);
        const password = screen.getByLabelText(/password/i);
        // simulate user input for both fields
        await user.type(username, 'example@example.com');
        await user.type(password, 'abc123');
        // make sure the values of the inputs match the mock user inputs
        expect(username).toHaveValue('example@example.com');
        expect(password).toHaveValue('abc123');
    });

    it('should call authenticateLogin on a successful login', async () => {
        // mock a resolution from authenticateLogin
        authenticateLogin.mockResolvedValue({
            id: 1,
            username: 'example@example.com'
        });
        // render the loginForm component, needs memory router as it is in a React Router environment
        render(
            <MemoryRouter>
                <LoginForm setError={mockSetError} />
            </MemoryRouter>
        );
        // get username input, password input and submit buttons
        const username = screen.getByLabelText(/email/i);
        const password = screen.getByLabelText(/password/i);
        const submit = screen.getByRole('button', { name: /submit/i });
        // simulate user input for both input fields and the submit button click
        await user.type(username, 'example@example.com');
        await user.type(password, 'abc123');
        await user.click(submit);
        // make sure that the authenticateLogin hook was called one time with the correct login credentials
        await waitFor(() => {
            expect(authenticateLogin).toHaveBeenCalledTimes(1);
            expect(authenticateLogin).toHaveBeenCalledWith({
                username: 'example@example.com',
                password: 'abc123'
            });
        })
    });

    it('should call set error on a failed login', async () => {
        // mock a rejection from authenticate login
        authenticateLogin.mockRejectedValue('Invalid Username or Password');
        // render the loginForm component, needs memory router as it is in a React Router environment
        render(
            <MemoryRouter>
                <LoginForm setError={mockSetError} />
            </MemoryRouter>
        );
        // get username input, password input and submit buttons
        const username = screen.getByLabelText(/email/i);
        const password = screen.getByLabelText(/password/i);
        const submit = screen.getByRole('button', { name: /submit/i });
        // simulate user input for both input fields and the submit button click
        await user.type(username, 'example@example.com');
        await user.type(password, 'abc123');
        await user.click(submit);
        // make sure that setError was called once by the invalid login form
        await waitFor(() => {
            expect(mockSetError).toHaveBeenCalledTimes(1);
            expect(mockSetError).toHaveBeenCalledWith('Invalid Username or Password')
        })
    });

    it('should navigate to user posts page after a successful login', async () => {
        // mock a resolution from authenticateLogin
        authenticateLogin.mockResolvedValue({
            id: 1,
            username: 'example@example.com'
        });
        // render the loginForm component, needs memory router as it is in a React Router environment
        render(
            <MemoryRouter>
                <LoginForm setError={mockSetError} />
            </MemoryRouter>
        );
        // get username input, password input and submit buttons
        const username = screen.getByLabelText(/email/i);
        const password = screen.getByLabelText(/password/i);
        const submit = screen.getByRole('button', { name: /submit/i });
        // simulate user input for both input fields and the submit button click
        await user.type(username, 'example@example.com');
        await user.type(password, 'abc123');
        await user.click(submit);
        // make sure useNavigate mock was called one time and by the correct url route
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith('/user/posts');
        });
    });
});