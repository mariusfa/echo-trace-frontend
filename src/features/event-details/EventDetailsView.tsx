import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { RoundedBoxContainer } from '../../components/containers/RoundedBoxContainer';
import { Heading1 } from '../../components/typography/Heading1';
import { Heading2 } from '../../components/typography/Heading2';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { fetchWrapper } from '../../wrappers/fetchWrapper';
import { navigationWrapper } from '../../wrappers/navigationWrapper';

interface Props {
    fetchDetails: (id: number) => Promise<EventDetails>;
    id: number;
}

export const EventDetailsView: FunctionalComponent<Props> = ({ fetchDetails, id }) => {
    const [eventDetails, setEventDetails] = useState<EventDetails>();

    useEffect(() => {
        const getEventDetails = async () => {
            const data = await fetchDetails(id);
            setEventDetails(data);
        }
        getEventDetails();

    }, []);

    const handleDelete = async () => {
        await fetchWrapper.deleteJson(`/event/${id}`);
        navigationWrapper.navigate('/');
    }

    if (!eventDetails) return null;

    return (
        <RoundedBoxContainer>
            <div class="flex justify-between">

            <Heading1 title={eventDetails.name} />
            <PrimaryButton label="Delete" onClick={handleDelete} />
            </div>
            <hr class="my-4"/>
            <Heading2 title="Count by last 30 days" />
            <ul class="mt-4">
            {eventDetails.dayCount.map((count, index) => (
                <li key={index}>{count}</li>
            ))}
            </ul>
        </RoundedBoxContainer>
    );
} 