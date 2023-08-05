import { describe, test, expect } from 'vitest';
import { EventOverview } from './EventOverview';
import { render, screen } from '@testing-library/preact';

describe('EventOverview test', () => {
    test('should render EventOverview', () => {
        render(<EventOverview />)
        expect(screen.getByRole('heading', { name: 'Events overview' })).toBeDefined();
    })
});