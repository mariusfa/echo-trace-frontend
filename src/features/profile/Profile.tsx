import { FunctionalComponent } from 'preact'
import { RoundedBoxContainer } from '../../components/containers/RoundedBoxContainer'
import { Heading1 } from '../../components/typography/Heading1'
import { useEffect, useState } from 'preact/hooks';
import { apiUrl, fetchWrapper } from '../../wrappers/fetchWrapper';
import { InputText } from '../../components/form/InputText';
import { Label } from '../../components/form/Label';

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
                <Label label='API Token' forInput='apiToken' />
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