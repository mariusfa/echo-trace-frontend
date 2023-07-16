const getToken = (): string | null => localStorage.getItem('token')

export const tokenWrapper = {
    getToken: getToken
}