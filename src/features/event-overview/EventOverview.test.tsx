import { describe, test, expect } from 'vitest';
import { EventOverview } from './EventOverview';
import { render, screen, waitFor } from '@testing-library/preact';
import { eventMocks } from './eventMocks';

describe('EventOverview test', () => {
    test('should render EventOverview', async () => {
        const fetchEvents = async () => Promise.resolve(eventMocks);

        render(<EventOverview fetchEvents={fetchEvents} />)
        expect(screen.getByRole('heading', { name: 'Events' })).toBeDefined();

        await waitFor(() => {
            expect(screen.getByText('Event 1')).toBeDefined()
        }, { timeout: 3000 })
        expect(screen.getByText('Count: 10')).toBeDefined();
    })
});