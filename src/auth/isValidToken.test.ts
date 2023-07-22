import { describe, expect, test } from 'vitest';
import { fetchWrapper } from '../wrappers/fetchWrapper';
import { tokenWrapper } from '../wrappers/tokenWrapper';

describe('isValidToken', () => {
    test('should return false if invalid token', async () => {
        fetchWrapper.getJson = (_url: string) => Promise.resolve({ status: 403, data: null });
        tokenWrapper.getToken = () => 'invalid token';
        const result = await isValidtoken();

        expect(result).toBe(false);
    });

    test('should return true if valid token', async () => {
        fetchWrapper.getJson = (_url: string) => Promise.resolve({ status: 200, data: null });
        tokenWrapper.getToken = () => 'valid token';
        const result = await isValidtoken();

        expect(result).toBe(true);
    });
});
