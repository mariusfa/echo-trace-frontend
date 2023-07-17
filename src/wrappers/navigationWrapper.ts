import { route } from 'preact-router'

const navigate = (path: string) => {
    console.log('navigate to: ', path);
    // window.location.href = path;
    route(path)
}

export const navigationWrapper = {
    navigate: navigate
}