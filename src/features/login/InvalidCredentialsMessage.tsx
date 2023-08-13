import { FunctionalComponent } from 'preact';
import { GeneralError } from '../../components/general-error/GeneralError';

export const InvalidCredentialsMessage: FunctionalComponent = () => {
    return (
        <div class="mb-4">
            <GeneralError message='Username or password is incorrect' />
        </div>
    );
};
