import { tokenWrapper } from './tokenWrapper';

const getApiUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return 'http://localhost:8080'
    } else {
        return 'https://tbd'
    }
}

export const apiUrl = getApiUrl()

const postJson = async (url: string, data: object) => {
    const response = await fetch(`${apiUrl}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        data = await response.json();
        return { status: response.status, data: data }
    } catch (error) {
        return { status: response.status, data: null }
    }
}

const getJson = async (url: string) => {
    const token = tokenWrapper.getToken();
    const response = await fetch(`${apiUrl}${url}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        },
    });
    try {
        const data = await response.json();
        return { status: response.status, data: data }
    } catch (error) {
        return { status: response.status, data: null }
    }
}

export const fetchWrapper = {
    postJson: postJson,
    getJson: getJson
}