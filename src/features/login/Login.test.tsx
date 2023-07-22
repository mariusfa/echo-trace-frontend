import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Login } from './Login';
import { fetchWrapper } from '../../wrappers/fetchWrapper';
import { tokenWrapper } from '../../wrappers/tokenWrapper';
import userEvent from '@testing-library/user-event';
import { navigationWrapper } from '../../wrappers/navigationWrapper';

describe('Login test', () => {
    test('should render Login', () => {
        render(<Login />)

        expect(screen.getByRole('heading', { name: 'Login' })).toBeDefined();
        expect(screen.getByText('Username')).toBeDefined()
        expect(screen.getByText('Password')).toBeDefined()
        expect(screen.getByRole('button', { name: 'Login' })).toBeDefined();
    })

    test('should render login successful', async () => {
        const token = 'test-token'
        const mockLogin = (_url: string, _data: object) => Promise.resolve({ status: 200, data: { token: token } })
        fetchWrapper.postJson = mockLogin
        let tokenStorage = null
        tokenWrapper.setToken = (token: string) => tokenStorage = token
        const history: string[] = []
        navigationWrapper.navigate = (path: string) => history.push(path)

        render(<Login />)

        const username = screen.getByLabelText('Username')
        const password = screen.getByLabelText('Password')
        const loginButton = screen.getByRole('button', { name: 'Login' })
        const user = {
            username: 'test',
            password: 'test-password',
        }
        await userEvent.type(username, user.username)
        await userEvent.type(password, user.password)
        await userEvent.click(loginButton)

        expect(tokenStorage).toBe(token)
        expect(history[0]).toBe('/')
    })
})