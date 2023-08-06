import { FunctionalComponent } from 'preact'
import { EventSummary } from './types'
import { Heading1 } from '../../components/typography/Heading1'
import { Heading2 } from '../../components/typography/Heading2'
import { RoundedBoxContainer } from '../../components/containers/RoundedBoxContainer'


interface Props {
    events: EventSummary[]
}

export const EventOverview: FunctionalComponent<Props> = ({ events }) => {
    return (
        <RoundedBoxContainer>
            <Heading1 title='Events'/>
            <div class="flex flex-wrap justify-center">
                {events.map(event => (
                    <a href={`/events/${event.id}`} class="mb-4 border-b last:border-b-0 pb-4 m-2 flex flex-col items-center w-1/2 sm:w-1/3 lg:w-1/4 cursor-pointer hover:bg-gray-200 transition-colors">
                        <Heading2 title={event.name}/>
                        <p>Count: {event.count}</p>
                        <p class="mt-2 text-blue-500 hover:text-blue-700 transition-colors">View More →</p>
                    </a>
                ))}
            </div>
        </RoundedBoxContainer>
    )
} 