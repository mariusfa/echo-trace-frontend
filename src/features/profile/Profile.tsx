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
                    Use this token to post events to <code>{`${apiUrl}`}/event</code> with DTO <code>{'{'}"name": "my-event-name"{'}'}</code> and header <code>Authorization "Api {apiToken}"</code>.
                </p>
            </div>
        </RoundedBoxContainer>
    )
}