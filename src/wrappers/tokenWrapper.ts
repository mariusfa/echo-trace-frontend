const getToken = (): string | null => localStorage.getItem('token')

const setToken = (token: string): void => localStorage.setItem('token', token)

export const tokenWrapper = {
    getToken: getToken,
    setToken: setToken
}