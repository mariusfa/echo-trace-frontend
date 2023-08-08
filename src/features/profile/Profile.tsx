import { FunctionalComponent } from 'preact'
import { RoundedBoxContainer } from '../../components/containers/RoundedBoxContainer'
import { Heading1 } from '../../components/typography/Heading1'
import { useEffect, useState } from 'preact/hooks';
import { apiUrl, fetchWrapper } from '../../wrappers/fetchWrapper';

export const Profile: FunctionalComponent = () => {
    const [apiToken, setApiToken] = useState('');

    useEffect(() => {
        const getApiToken = async () => {
            const response = await fetchWrapper.getJson('/user/api-token');
            setApiToken(response.data.token);
        }

        getApiToken();
    }, []);

    return (
        <RoundedBoxContainer md={true}>
            <Heading1 title='Profile' />
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="apiToken">
                    API Token
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="apiToken"
                    type="text"
                    value={apiToken}
                    readOnly
                />
                <p class="mt-2 text-gray-600 text-sm">
                    Use this token to post events to <code>{`${apiUrl}`}/events</code> with DTO <code>{'{'}"name": "my-event-name"{'}'}</code> and header <code>Authorization "API {apiToken}"</code>.
                </p>
            </div>

            {/* <hr class="my-6" />

            <button
                class="w-full mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Simulate Data
            </button>

            <p class="text-gray-600">
                Simulation data will be used to view in the events overview. This is just for experimentation purposes.
            </p> */}
        </RoundedBoxContainer>
    )
}