import { route } from 'preact-router'

const navigate = (path: string) => {
    route(path)
}

export const navigationWrapper = {
    navigate: navigate
}