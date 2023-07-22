import { FunctionalComponent } from 'preact';
import { Link } from 'preact-router';
import { RoundedBoxContainer } from '../../components/containers/RoundedBoxContainer';

export const RegistrationSuccess: FunctionalComponent = () => {
    return (
        <RoundedBoxContainer md={true}>
            <h1 class='mb-4 text-gray-700 text-lg font-bold'>
                Registration Successful!
            </h1>
            <p class='mb-4 text-gray-700'>
                Thank you for registering. You can now{' '}
                <Link class='text-blue-500 hover:text-blue-800' href='/login'>
                    login
                </Link>
                .
            </p>
        </RoundedBoxContainer>
    );
};
