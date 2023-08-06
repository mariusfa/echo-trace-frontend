import { FunctionalComponent } from 'preact'
import { EventOverview } from './EventOverview'
import { eventMocks } from './eventMocks'

export const EventOverviewData: FunctionalComponent = () => {
    return (
        <EventOverview events={eventMocks} />
    )
}