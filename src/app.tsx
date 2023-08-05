import { FunctionComponent } from 'preact'
import Router from 'preact-router'
import { Home } from './features/home/Home'
import { Login } from './features/login/Login'
import { Header } from './features/header/Header'
import { tokenWrapper } from './wrappers/tokenWrapper'
import { PrivateRoute } from './route/PrivateRoute'
import { Register } from './features/register/Register'
import { isValidToken } from './auth/isValidToken'
import { useEffect, useState } from 'preact/hooks'
import { Profile } from './features/profile/Profile'

export const App: FunctionComponent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        setIsAuthenticated(tokenWrapper.getToken() !== null)
        

        const checkToken = async () => {
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
                <PrivateRoute path="/" isAuthenticated={isAuthenticated} component={Home} />
                <PrivateRoute path="/profile" isAuthenticated={isAuthenticated} component={Profile} />
                <Login path="/login" setIsAuthenticated={setIsAuthenticated} />
                <Register path="/register" />
            </Router>
        </div>
    )
}
