
import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/preact';
import { Register } from './Register';
import userEvent from '@testing-library/user-event';

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
})