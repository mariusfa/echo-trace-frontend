
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { FunctionComponent } from 'preact';
import Router from 'preact-router';
import { navigationWrapper } from '../wrappers/navigationWrapper';
import { PrivateRoute } from './PrivateRoute';

const PrivateComponent: FunctionComponent = () => {
    return (
        <div>Private</div>
    )
}

describe('Home test', () => {
    test('should private route', () => {
        const navigationHistory = ['/']
        const navigate = (path: string) => navigationHistory.push(path)
        navigationWrapper.navigate = navigate

        render(
            <Router>
                <PrivateRoute path="/" isAuthenticated={true} component={PrivateComponent} />
            </Router>
        )
        expect(screen.getByText('Private')).toBeDefined()
        expect(navigationHistory.length).toBe(1)
    })

    test('should not get private route', () => {
        const navigationHistory = ['/']
        const navigate = (path: string) => navigationHistory.push(path)
        navigationWrapper.navigate = navigate

        render(
            <Router>
                <PrivateRoute path="/" isAuthenticated={false} component={PrivateComponent} />
            </Router>
        )
        expect(navigationHistory.length).toBe(2)
        expect(navigationHistory[1]).toBe('/login')
    })
})