import { FunctionalComponent } from 'preact';
import { RoundedBoxContainer } from '../../components/containers/RoundedBoxContainer';
import { Heading1 } from '../../components/typography/Heading1';
import { useState } from 'preact/hooks';
import { InputTextGroup } from '../../components/form/InputTextGroup';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { Link } from 'preact-router';
import { fetchWrapper } from '../../wrappers/fetchWrapper';
import { tokenWrapper } from '../../wrappers/tokenWrapper';
import { navigationWrapper } from '../../wrappers/navigationWrapper';

interface Props {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const Login: FunctionalComponent<Props> = ({setIsAuthenticated}) => {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    });

    const [formErrors, _setFormErrors] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (event: Event) => {
        const { name, value } = event.target as HTMLInputElement;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleLogin = async (event: Event) => {
        event.preventDefault();

        // const errors = validateForm();
        // if (errors.username || errors.password || errors.confirmPassword) {
        //     setFormErrors(errors);
        //     return;
        // }

        const loginDTO = {
            username: formValues.username,
            password: formValues.password,
        }

        try {
            const { status, data } = await fetchWrapper.postJson('/user/login', loginDTO);
            if (status === 200) {
                const token = (data as any).token;
                tokenWrapper.setToken(token);
                setIsAuthenticated(true);
                navigationWrapper.navigate('/');
            }
        } catch (error) {
            // setShowGeneralError(true);
        }
    }

    // const validateForm = () => {
    // };


    return (
        <RoundedBoxContainer md={true}>
            <form onSubmit={handleLogin}>
                <Heading1 title='Login' />
                <InputTextGroup
                    label='Username'
                    name='username'
                    value={formValues.username}
                    onChange={handleChange}
                    error={formErrors.username}
                />
                <InputTextGroup
                    label='Password'
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                    error={formErrors.password}
                    type='password'
                />

                <div class='flex items-center justify-between'>
                    <PrimaryButton label='Login' type='submit' />
                    <Link
                        class='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
                        href='/login'
                    >
                        Not registered? Register!
                    </Link>
                </div>
            </form>
        </RoundedBoxContainer>
    );
};
