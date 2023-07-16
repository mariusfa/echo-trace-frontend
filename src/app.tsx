import { FunctionComponent } from 'preact'
import Router from 'preact-router'
import { Home } from './features/home/Home'

export const App: FunctionComponent = () => {

    return (
        <Router>
            <Home path="/" />
        </Router>
    )
}
