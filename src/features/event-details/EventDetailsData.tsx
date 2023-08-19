import { FunctionalComponent } from 'preact';
import { RoutableProps } from 'preact-router';
import { fetchWrapper } from '../../wrappers/fetchWrapper';
import { EventDetailsView } from './EventDetailsView';

interface Props extends RoutableProps {
    id?: number;
}

export const EventDetailsData: FunctionalComponent<Props> = ({id}) => {
    
    const fetchDetails = async (id: number) => {
        const response = await fetchWrapper.getJson(`/event/${id}`);
        return response.data
    }

    return (
        <EventDetailsView fetchDetails={fetchDetails} id={id!!}/>
    )
}
