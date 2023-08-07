import { FunctionalComponent } from 'preact'
import { EventOverview } from './EventOverview'
import { fetchWrapper } from '../../wrappers/fetchWrapper'

export const EventOverviewData: FunctionalComponent = () => {
    const fetchEvents = async () => {
        const response = await fetchWrapper.getJson('/event');
        return response.data
    }

    return (
        <EventOverview fetchEvents={fetchEvents} />
    )
}