import { FunctionComponent } from 'preact';
import { RoutableProps } from 'preact-router';
import { navigationWrapper } from '../wrappers/navigationWrapper';
import { useEffect } from 'preact/hooks';

interface Props extends RoutableProps {
    component: FunctionComponent
    isAuthenticated: boolean
}

export const PrivateRoute: FunctionComponent<Props> = ({ component: Component, isAuthenticated, ...rest }) => {
    useEffect(() => {
        if (!isAuthenticated) {
            navigationWrapper.navigate('/login')
        }
    }, [isAuthenticated])

    return <Component {...rest} />

}
