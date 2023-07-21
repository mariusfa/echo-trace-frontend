import { FunctionalComponent } from 'preact';

interface Props {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit";
}

export const PrimaryButton: FunctionalComponent<Props> = ({ label, onClick, type = "button" }) => {
    return (
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type={type}
            onClick={onClick}
        >
            {label}
        </button>
    );
}