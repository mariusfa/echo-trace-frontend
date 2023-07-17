
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Register } from './Register';

describe('Register test', () => {
    test('should render Register', () => {
        render(<Register />)
        expect(screen.getByRole('heading', { name: 'Register' })).toBeDefined();
        expect(screen.getByText('Username')).toBeDefined()
        expect(screen.getByText('Password')).toBeDefined()
        expect(screen.getByText('Confirm Password')).toBeDefined()
        expect(screen.getByRole('button', { name: 'Register' })).toBeDefined();
    })
})