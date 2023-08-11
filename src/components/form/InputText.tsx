import { FunctionalComponent } from 'preact';

interface Props {
    label?: string;
    name: string;
    value: string;
    onChange?: (event: Event) => void;
    type?: string;
    readonly?: boolean;
    
}

export const InputText: FunctionalComponent<Props> = ({
    label,
    name,
    value,
    onChange,
    type,
    readonly
}) => {
    return (
            <input 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                id={name} 
                name={name} 
                type={type} 
                placeholder={label} 
                value={value} 
                onChange={onChange} 
                readOnly={readonly}
            />
    
    )
}