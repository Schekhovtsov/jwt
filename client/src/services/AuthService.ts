import instance from "../http";
import { AxiosResponse } from 'axios';
import { IAuthResponse } from "../models/IAuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return instance.post<IAuthResponse>('/login', { email, password });
    }

    static async register(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return instance.post<IAuthResponse>('/registration', { email, password });
    }

    static async logout(): Promise<AxiosResponse<IAuthResponse>> {
        return instance.post<IAuthResponse>('/logout');
    }
}

