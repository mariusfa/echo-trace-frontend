import { FunctionalComponent } from 'preact'
import { Link } from 'preact-router';
import { useState } from 'preact/hooks';
import { fetchWrapper } from '../../wrappers/fetchWrapper';
import { RegistrationSuccess } from './RegistrationSuccess';
import { GeneralError } from '../../components/general-error/GeneralError';

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
        <div class="flex justify-center items-center">
            <div class="w-full max-w-md">
                <form class="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4" onSubmit={handleRegister}>
                    <h1 class="mb-4 text-gray-700 text-lg font-bold">Register</h1>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="text" placeholder="Username" value={formValues.username} onChange={handleChange} />
                        {formErrors.username && <p class="text-red-500 text-xs italic">{formErrors.username}</p>}
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
                        {formErrors.password && <p class="text-red-500 text-xs italic">{formErrors.password}</p>}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">
                            Confirm Password
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" value={formValues.confirmPassword} onChange={handleChange} />
                        {formErrors.confirmPassword && <p class="text-red-500 text-xs italic">{formErrors.confirmPassword}</p>}
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" type="submit">
                            Register
                        </button>
                        <Link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
                            Already registered? Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}