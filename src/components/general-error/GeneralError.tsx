import { FunctionalComponent } from 'preact';

export const GeneralError: FunctionalComponent<{ message?: string }> = ({ message = "An error occurred!" }) => {
    return (
        <div class="w-full mx-auto max-w-md shadow-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
            <strong class="font-bold">Error:</strong>
            <span> {message}</span>
        </div>
    );
}