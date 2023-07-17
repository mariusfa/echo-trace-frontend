import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Header } from './Header';

describe('Header test', () => {
    test('should render Header with login', () => {
        render(<Header isAuthenticated={false} />)
        expect(screen.getByText('EchoTrace')).toBeDefined()
        expect(screen.getByText('Login')).toBeDefined()
        expect(screen.getByText('Register')).toBeDefined()
    })

    test('should render Header with profile', () => {
        render(<Header isAuthenticated={true} />)
        expect(screen.getByText('EchoTrace')).toBeDefined()
        expect(screen.getByText('Profile')).toBeDefined()
    })
})