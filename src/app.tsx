import { FunctionComponent } from 'preact'
import Router from 'preact-router'
import { Login } from './features/login/Login'
import { Header } from './features/header/Header'
import { tokenWrapper } from './wrappers/tokenWrapper'
import { PrivateRoute } from './route/PrivateRoute'
import { Register } from './features/register/Register'
import { isValidToken } from './auth/isValidToken'
import { useEffect, useState } from 'preact/hooks'
import { Profile } from './features/profile/Profile'
import { EventOverviewData } from './features/event-overview/EventOverviewData'
import { trackEvent } from './tracking/trackEvent'

export const App: FunctionComponent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        trackEvent('pageview')
    }, []);

    useEffect(() => {
        setIsAuthenticated(tokenWrapper.getToken() !== null)

        const checkToken = async () => {
            if(!tokenWrapper.getToken()) return

            const isValid = await isValidToken()
            
            if (!isValid) {
                tokenWrapper.removeToken()
                setIsAuthenticated(false)
            }
        }
        checkToken()
        const intervalId = setInterval(checkToken, 1000 * 60)
        return () => clearInterval(intervalId)
        
    }, []);

    return (
        <div class="mx-auto max-w-screen-md p-4">
            <Header isAuthenticated={isAuthenticated} />
            <Router>
                <PrivateRoute path="/" isAuthenticated={isAuthenticated} component={EventOverviewData} />
                <PrivateRoute path="/profile" isAuthenticated={isAuthenticated} component={Profile} />
                <Login path="/login" setIsAuthenticated={setIsAuthenticated} />
                <Register path="/register" />
            </Router>
        </div>
    )
}
