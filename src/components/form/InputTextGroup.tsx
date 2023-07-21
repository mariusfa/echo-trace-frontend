import { FunctionalComponent } from 'preact';

interface Props {
    label: string;
    name: string;
    value: string;
    onChange: (event: Event) => void;
    error: string;
    type?: string;
}

export const InputTextGroup: FunctionalComponent<Props> = ({ label, name, value, onChange, error, type = 'text' }) => {
    return (
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for={name}>
                {label}
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id={name} name={name} type={type} placeholder={label} value={value} onChange={onChange} />
            {error && <p class="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
}
