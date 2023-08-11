import { FunctionalComponent } from 'preact';
import { InputText } from './InputText';
import { Label } from './Label';

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
            <Label label={label} forInput={name} />
            <InputText label={label} name={name} value={value} onChange={onChange} type={type} />
            {error && <p class="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
}
