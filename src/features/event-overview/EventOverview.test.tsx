import { describe, test, expect } from 'vitest';
import { EventOverview } from './EventOverview';
import { render, screen } from '@testing-library/preact';
import { eventMocks } from './eventMocks';

describe('EventOverview test', () => {
    test('should render EventOverview', () => {

        render(<EventOverview events={eventMocks} />)
        expect(screen.getByRole('heading', { name: 'Events' })).toBeDefined();
        expect(screen.getByText('Event 1')).toBeDefined();
        expect(screen.getByText('Count: 10')).toBeDefined();
    })
});