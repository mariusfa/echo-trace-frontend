import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/preact';
import { Register } from './Register';
import userEvent from '@testing-library/user-event';
import { fetchWrapper } from '../../wrappers/fetchWrapper';

describe('Register test', () => {
    test('should render Register', () => {
        render(<Register />)
        expect(screen.getByRole('heading', { name: 'Register' })).toBeDefined();
        expect(screen.getByText('Username')).toBeDefined()
        expect(screen.getByText('Password')).toBeDefined()
        expect(screen.getByText('Confirm Password')).toBeDefined()
        expect(screen.getByRole('button', { name: 'Register' })).toBeDefined();
    })

    test('should do a register user', async () => {
        const mockRegister = (_url: string, _data: object) => Promise.resolve({ status: 200, data: null })
        fetchWrapper.postJson = mockRegister

        render(<Register />)

        const username = screen.getByLabelText('Username')
        const password = screen.getByLabelText('Password')
        const confirmPassword = screen.getByLabelText('Confirm Password')
        const registerButton = screen.getByRole('button', { name: 'Register' })
        const user = {
            username: 'test',
            password: 'test-password',
        }

        await userEvent.type(username, user.username)
        await userEvent.type(password, user.password)
        await userEvent.type(confirmPassword, user.password)
        await userEvent.click(registerButton)

        await waitFor(() => {
            expect(screen.getByText('Registration Successful!')).toBeDefined()
        }, { timeout: 3000 })
    })

    test('should fail to register user - show validation messages for empty input fields', async () => {
        render(<Register />)
        const registerButton = screen.getByRole('button', { name: 'Register' })
        await userEvent.click(registerButton)
        expect(screen.getByText('Username is required')).toBeDefined()
        expect(screen.getByText('Password is required')).toBeDefined()
        expect(screen.getByText('Confirm Password is required')).toBeDefined()
    })

    test('should fail to register user - show validation messages for password mismatch', async () => {
        const user = {
            username: 'test',
            password: 'test-password',
            confirmPassword: 'test-password-2',
        }
        render(<Register />)

        const username = screen.getByLabelText('Username')
        const password = screen.getByLabelText('Password')
        const confirmPassword = screen.getByLabelText('Confirm Password')
        await userEvent.type(username, user.username)
        await userEvent.type(password, user.password)
        await userEvent.type(confirmPassword, user.confirmPassword)

        const registerButton = screen.getByRole('button', { name: 'Register' })
        await userEvent.click(registerButton)

        expect(screen.queryAllByText('Password and Confirm Password must match').length).toBe(2)
    })

    test('should fail to register user - username taken', async () => {
        const mockRegister = (_url: string, _data: object) => Promise.resolve({ status: 409, data: null })
        fetchWrapper.postJson = mockRegister

        const user = {
            username: 'test',
            password: 'test-password',
        }
        render(<Register />)

        const username = screen.getByLabelText('Username')
        const password = screen.getByLabelText('Password')
        const confirmPassword = screen.getByLabelText('Confirm Password')
        await userEvent.type(username, user.username)
        await userEvent.type(password, user.password)
        await userEvent.type(confirmPassword, user.password)

        const registerButton = screen.getByRole('button', { name: 'Register' })
        await userEvent.click(registerButton)

        expect(screen.getByText('Username is already taken')).toBeDefined()
    })

    test('should fail to register user - server error', async () => {
        const mockRegister = (_url: string, _data: object) => Promise.resolve({ status: 500, data: null })
        fetchWrapper.postJson = mockRegister

        const user = {
            username: 'test',
            password: 'test-password',
        }
        render(<Register />)

        const username = screen.getByLabelText('Username')
        const password = screen.getByLabelText('Password')
        const confirmPassword = screen.getByLabelText('Confirm Password')
        await userEvent.type(username, user.username)
        await userEvent.type(password, user.password)
        await userEvent.type(confirmPassword, user.password)

        const registerButton = screen.getByRole('button', { name: 'Register' })
        await userEvent.click(registerButton)

        expect(screen.getByText('Error:')).toBeDefined()
    })
})