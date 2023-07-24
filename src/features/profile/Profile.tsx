import { FunctionalComponent } from 'preact'

export const Profile: FunctionalComponent = () => {
    return (
        <div class="flex flex-col justify-center items-center h-full py-8">
            <h1 class="mb-6 text-gray-700 text-2xl font-bold">Profile</h1>

            <div class="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="apiToken">
                        API Token
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="apiToken"
                        type="text"
                        value={"api-token"}
                        readOnly
                    />
                    <p class="mt-2 text-gray-600 text-sm">
                        Use this token to post events to <code>apiUrl/events</code> with DTO <code>{'{'}name: eventName{'}'}</code> and header <code>Authorization "API {"api-token"}"</code>.
                    </p>
                </div>

                <hr class="my-4" />

                <button
                    class="w-full mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Simulate Data
                </button>

                <p class="text-gray-600">
                    Simulation data will be used to view in the events overview. This is just for experimentation purposes.
                </p>
            </div>
        </div>
    )
}