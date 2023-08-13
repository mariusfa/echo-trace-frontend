import { FunctionalComponent } from 'preact';
import { RoundedBoxContainer } from '../../components/containers/RoundedBoxContainer';
import { Heading1 } from '../../components/typography/Heading1';
import { useState } from 'preact/hooks';
import { InputTextGroup } from '../../components/form/InputTextGroup';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { fetchWrapper } from '../../wrappers/fetchWrapper';
import { tokenWrapper } from '../../wrappers/tokenWrapper';
import { navigationWrapper } from '../../wrappers/navigationWrapper';
import { LinkText } from '../../components/links/LinkText';
import { InvalidCredentialsMessage } from './InvalidCredentialsMessage';

interface Props {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const Login: FunctionalComponent<Props> = ({ setIsAuthenticated }) => {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({
        username: '',
        password: '',
    });
    const [showInvalidCredentialsMessage, setShowInvalidCredentialsMessage] =
        useState(false);

    const handleChange = (event: Event) => {
        const { name, value } = event.target as HTMLInputElement;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        setFormErrors({
            ...formErrors,
            [name]: '',
        });
        setShowInvalidCredentialsMessage(false);
    };

    const handleLogin = async (event: Event) => {
        event.preventDefault();

        const errors = validateForm();
        if (errors.username || errors.password) {
            setFormErrors(errors);
            return;
        }

        const loginDTO = {
            username: formValues.username,
            password: formValues.password,
        };

        const { status, data } = await fetchWrapper.postJson(
            '/user/login',
            loginDTO
        );
        if (status === 200) {
            const token = (data as any).token;
            tokenWrapper.setToken(token);
            setIsAuthenticated(true);
            navigationWrapper.navigate('/');
        } else if (status === 401) {
            setShowInvalidCredentialsMessage(true);
        }
    };

    const validateForm = () => {
        const { username, password } = formValues;
        const errors = {
            username: '',
            password: '',
            confirmPassword: '',
        };
        if (!username) {
            errors.username = 'Username is required';
        }
        if (!password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    return (
        <RoundedBoxContainer md={true}>
            <form onSubmit={handleLogin}>
                <Heading1 title='Login' />
                {showInvalidCredentialsMessage && <InvalidCredentialsMessage />}
                <InputTextGroup
                    label='Username'
                    name='username'
                    value={formValues.username}
                    onChange={handleChange}
                    error={formErrors.username}
                />
                <InputTextGroup
                    label='Password'
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                    error={formErrors.password}
                    type='password'
                />

                <div class='flex items-center justify-between'>
                    <PrimaryButton label='Login' type='submit' />
                    <LinkText href='/register'>
                        Not registered? Register!
                    </LinkText>
                </div>
            </form>
        </RoundedBoxContainer>
    );
};
