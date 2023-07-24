import { describe, expect, test } from 'vitest';
import { screen, render } from '@testing-library/preact';
import { fetchWrapper } from '../../wrappers/fetchWrapper';
import { Profile } from './Profile';

describe('Profile test', () => {
    test('should render Profile', () => {
        fetchWrapper.getJson = (_url: string) => Promise.resolve({ status: 200, data: {token: 'api-token'} })
        render(<Profile />)
        expect(screen.getByRole('heading', { name: 'Profile' })).toBeDefined();
        expect(screen.getByText('API Token')).toBeDefined()
    })
})
