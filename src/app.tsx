import { FunctionComponent } from 'preact'
import Router from 'preact-router'
import { Home } from './features/home/Home'
import { Login } from './features/login/Login'
import { Header } from './features/header/Header'
import { tokenWrapper } from './wrappers/tokenWrapper'
import { PrivateRoute } from './route/PrivateRoute'
import { Register } from './features/register/Register'

export const App: FunctionComponent = () => {

    const isAuthenticated = tokenWrapper.getToken() !== null

    return (
        <div class="mx-auto max-w-screen-md p-4">
            <Header isAuthenticated={isAuthenticated} />
            <Router>
                <PrivateRoute path="/" isAuthenticated={isAuthenticated} component={Home} />
                <Login path="/login" />
                <Register path="/register" />
            </Router>
        </div>
    )
}
