import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Home } from './Home';

describe('Home test', () => {
    test('should render Home', () => {
        render(<Home />)
        expect(screen.getByText('Home')).toBeDefined()
    })
})