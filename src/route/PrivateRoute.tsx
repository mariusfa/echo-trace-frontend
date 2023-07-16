import { FunctionComponent } from 'preact';
import { RoutableProps } from 'preact-router';
import { navigationWrapper } from '../wrappers/navigationWrapper';
import { tokenWrapper } from '../wrappers/tokenWrapper';

interface Props extends RoutableProps {
    component: FunctionComponent
}

export const PrivateRoute: FunctionComponent<Props> = ({component: Component, ...rest}) => {
    const isAuthenticaterd = tokenWrapper.getToken() !== null

    if (!isAuthenticaterd) {
        navigationWrapper.navigate('/login')
        return null
    }
    return <Component {...rest} />

}
