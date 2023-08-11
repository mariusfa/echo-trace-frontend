import { FunctionalComponent } from 'preact'
import { RoundedBoxContainer } from '../../components/containers/RoundedBoxContainer'
import { Heading1 } from '../../components/typography/Heading1'
import { useEffect, useState } from 'preact/hooks';
import { apiUrl, fetchWrapper } from '../../wrappers/fetchWrapper';
import { InputText } from '../../components/form/InputText';

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
                <InputText
                    name='apiToken'
                    value={apiToken}
                    readonly={true}
                />
                <p class="mt-2 text-gray-600 text-sm">
                    Use this token to post events to <code>{`${apiUrl}`}/event</code> with DTO <code>{'{'}"name": "my-event-name"{'}'}</code> and header <code>Authorization "Api {apiToken}"</code>.
                </p>
            </div>
        </RoundedBoxContainer>
    )
}