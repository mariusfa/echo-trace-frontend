import { FunctionalComponent } from 'preact'
import { EventSummary } from './types'


interface Props {
    events: EventSummary[]
}

export const EventOverview: FunctionalComponent<Props> = ({ events }) => {
    return (
        <div class="p-4 border rounded shadow-md bg-white">
            <h2 class="mb-4 text-2xl font-bold">Events</h2>
            <div class="flex flex-wrap justify-center">
                {events.map(event => (
                    <a href={`/events/${event.id}`} class="block mb-4 border-b last:border-b-0 pb-4 m-2 flex flex-col items-center w-1/2 sm:w-1/3 lg:w-1/4 cursor-pointer hover:bg-gray-200 transition-colors">
                        <h3 class="text-lg font-bold">{event.name}</h3>
                        <p>Count: {event.count}</p>
                        <p class="mt-2 text-blue-500 hover:text-blue-700 transition-colors">View More →</p>
                    </a>
                ))}
            </div>
        </div>
    )
} 