const getToken = (): string | null => localStorage.getItem('token')

const setToken = (token: string): void => localStorage.setItem('token', token)

const removeToken = (): void => localStorage.removeItem('token')

export const tokenWrapper = {
    getToken: getToken,
    setToken: setToken,
    removeToken: removeToken
}