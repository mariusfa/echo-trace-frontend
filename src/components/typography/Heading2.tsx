import { FunctionalComponent } from 'preact';

interface Props {
    title: string;
}

export const Heading2: FunctionalComponent<Props> = ({ title }) => {
    return (
        <h2 class="text-gray-700 text-lg font-bold">{title}</h2>
    );
}