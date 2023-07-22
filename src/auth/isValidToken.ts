import { fetchWrapper } from '../wrappers/fetchWrapper';

export const isValidToken = async (): Promise<Boolean> => {
    const response = await fetchWrapper.getJson('/user/refresh');
    return response.status === 200;
}