import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Login } from './Login';

describe('Login test', () => {
    test('should render Login', () => {
        render(<Login />)
        expect(screen.getByText('Login')).toBeDefined()
    })
})