const apiUrl = 'http://localhost:8080';

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

export const fetchWrapper = {
    postJson: postJson
}