import { FunctionalComponent } from 'preact'
import { Link } from 'preact-router';
import { useState } from 'preact/hooks';

export const Register: FunctionalComponent = () => {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        });

    const handleChange = (event: Event) => {
        const {name, value} = event.target as HTMLInputElement;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleRegister = (event: Event) => {
        event.preventDefault();
        // Here is where you'd handle the registration
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
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="text" placeholder="Username" value={formValues.username} onChange={handleChange} />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">
                            Confirm Password
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" value={formValues.confirmPassword} onChange={handleChange} />
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