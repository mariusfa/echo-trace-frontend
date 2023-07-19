import { FunctionalComponent } from 'preact'
import { Link } from 'preact-router'

export const RegistrationSuccess: FunctionalComponent = () => {
    return (
        <div class="flex justify-center items-center">
            <div class="w-full max-w-md">
                <div class="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4">
                    <h1 class="mb-4 text-gray-700 text-lg font-bold">Registration Successful!</h1>
                    <p class="mb-4 text-gray-700">Thank you for registering. You can now <Link class="text-blue-500 hover:text-blue-800" href="/login">login</Link>.</p>
                </div>
            </div>
        </div>
    )
}