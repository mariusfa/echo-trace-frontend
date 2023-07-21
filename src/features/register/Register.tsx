import { FunctionalComponent } from 'preact'
import { Link } from 'preact-router';
import { useState } from 'preact/hooks';
import { fetchWrapper } from '../../wrappers/fetchWrapper';
import { RegistrationSuccess } from './RegistrationSuccess';
import { GeneralError } from '../../components/general-error/GeneralError';
import { InputTextGroup } from '../../components/form/InputTextGroup';

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
        <form class="w-full max-w-md mx-auto bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4" onSubmit={handleRegister}>
            <h1 class="mb-4 text-gray-700 text-lg font-bold">Register</h1>
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
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" type="submit">
                    Register
                </button>
                <Link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
                    Already registered? Sign In
                </Link>
            </div>
        </form>
    );
}