import { apiUrl } from '../wrappers/fetchWrapper';

export const trackEvent = async (event: string) => {
    if (process.env.NODE_ENV === "development") {
        console.log("Event: " + event)
        return
    }
    try {
        await fetch(`${apiUrl}/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Api lbGETNGbtdclhJSgT5z1WNCQ776e8Gki`
            },
            body: JSON.stringify({ name: event })
        });
    } catch (error) {
        // Do nothing
    }
}
