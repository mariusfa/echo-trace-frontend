import { FunctionalComponent } from 'preact'
import { Link } from 'preact-router';
import { useState } from 'preact/hooks';
import { fetchWrapper } from '../../wrappers/fetchWrapper';
import { RegistrationSuccess } from './RegistrationSuccess';
import { GeneralError } from '../../components/general-error/GeneralError';
import { InputTextGroup } from '../../components/form/InputTextGroup';
import { Heading1 } from '../../components/typography/Heading1';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { RoundedBoxContainer } from '../../components/containers/RoundedBoxContainer';

export const Register: FunctionalComponent = () => {
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [formErrors, setFormErrors] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [showGeneralError, setShowGeneralError] = useState(false);

    const handleChange = (event: Event) => {
        const { name, value } = event.target as HTMLInputElement;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleRegister = async (event: Event) => {
        event.preventDefault();

        const errors = validateForm();
        if (errors.username || errors.password || errors.confirmPassword) {
            setFormErrors(errors);
            return;
        }

        const registerDTO = {
            username: formValues.username,
            password: formValues.password,
        }
        try {
            const { status } = await fetchWrapper.postJson('/user/register', registerDTO);

            if (status === 409) {
                setFormErrors({
                    ...formErrors,
                    username: 'Username is already taken'
                })
            } else if (status === 200) {
                setRegisterSuccess(true);
            } else {
                setShowGeneralError(true);
            }

        } catch (error) {
            setShowGeneralError(true);

        }
    }

    const validateForm = () => {
        const { username, password, confirmPassword } = formValues;
        const errors = {
            username: '',
            password: '',
            confirmPassword: '',
        }
        if (!username) {
            errors.username = 'Username is required'
        }
        if (!password) {
            errors.password = 'Password is required'
        }
        if (!confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required'
        }
        if (password !== confirmPassword) {
            errors.password = 'Password and Confirm Password must match'
            errors.confirmPassword = 'Password and Confirm Password must match'
        }
        return errors;
    }

    if (showGeneralError) {
        return <GeneralError />
    }

    if (registerSuccess) {
        return <RegistrationSuccess />
    }

    return (
        <RoundedBoxContainer md={true}>
            <form onSubmit={handleRegister}>
                <Heading1 title="Register" />
                <InputTextGroup
                    label="Username"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                    error={formErrors.username}
                />
                <InputTextGroup
                    label="Password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    error={formErrors.password}
                    type="password"
                />
                <InputTextGroup
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    error={formErrors.confirmPassword}
                    type="password"
                />
                <div class="flex items-center justify-between">
                    <PrimaryButton label='Register' type='submit' />
                    <Link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
                        Already registered? Sign In
                    </Link>
                </div>
            </form>
        </RoundedBoxContainer>
    );
}