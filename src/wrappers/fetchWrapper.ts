import { tokenWrapper } from './tokenWrapper';

const getApiUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return 'http://localhost:8080'
    } else {
        return 'https://echo-trace-api.up.railway.app'
    }
}

export const apiUrl = getApiUrl()

const postJson = async (url: string, data: object) => {
    const { response, error } = await fetchRaw(url, 'POST', data);
    if (error) {
        return { status: null, data: null, fetchError: true }
    }
    try {
        const data = await response!!.json();
        return { status: response!!.status, data: data, fetchError: false }
    } catch (error) {
        return { status: response!!.status, data: null, fetchError: false }
    }
}

const getJson = async (url: string) => {
    const { response, error } = await fetchRaw(url, 'GET');
    if (error) {
        return { status: null, data: null, fetchError: true }
    }
    try {
        const data = await response!!.json();
        return { status: response!!.status, data: data, fetchError: false }
    } catch (error) {
        return { status: response!!.status, data: null, fetchError: false }
    }
}

const fetchRaw = async (url: string, method: 'GET' | 'POST', data: object | undefined = undefined) => {
    const token = tokenWrapper.getToken();
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    }
    try {
        const response = await fetch(`${apiUrl}${url}`, {
            method: method,
            headers: headers,
            body: data ? JSON.stringify(data) : undefined
        });
        return { response: response, error: false }
    } catch (error) {
        return { response: null, error: true }
    }
}

export const fetchWrapper = {
    postJson: postJson,
    getJson: getJson
}