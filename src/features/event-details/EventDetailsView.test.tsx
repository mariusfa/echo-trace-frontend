
import { describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/preact';
import { EventDetailsView } from './EventDetailsView';

const eventDetailsMock: EventDetails = {
    id: 1,
    name: "test",
    dayCount: [0, 1, 2, 3]
}

describe('EventOverview test', () => {
    test('should render EventOverview', async () => {
        const fetchEvents = async (_id: number) => Promise.resolve(eventDetailsMock);

        render(<EventDetailsView id={1} fetchDetails={fetchEvents} />)

        await waitFor(() => {
            expect(screen.getByText('test')).toBeDefined()
        }, { timeout: 3000 })
        expect(screen.getByText('Count by last 30 days')).toBeDefined();
    })
});