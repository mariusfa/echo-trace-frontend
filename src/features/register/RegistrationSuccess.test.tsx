import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { RegistrationSuccess } from './RegistrationSuccess';

describe('Registration Success test', () => {
    test('should render Registration Success', () => {
        render(<RegistrationSuccess />)

        expect(screen.getByText('Registration Successful!')).toBeDefined()
    })

    test('should render navigate to login when clicked link', () => {
        render(<RegistrationSuccess />)
        const link = screen.getByRole('link', { name: 'login' })
        expect(link.getAttribute('href')).toBe('/login')
    })

})