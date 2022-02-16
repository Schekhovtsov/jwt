import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from 'axios';
import { IAuthResponse } from "../models/IAuthResponse";
import { API_URL } from "../http";

class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            console.log('Login: ', response)
            this.setAuth(true);
            this.setUser(response.data.user);
        }   catch (e: any)   {
            console.log(e.response?.data?.message);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.register(email, password);
            localStorage.setItem('token', response.data.accessToken);
            console.log('Register: ', response)
            this.setAuth(true);
            this.setUser(response.data.user);
        }   catch (e: any)   {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        }   catch (e: any)   {
            console.log(e.response?.data?.message);
        }
    }

    async refreshAuth() {
        try {
            this.setLoading(true);
            const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            console.log('Refresh function worked', response)
        }   catch (e: any)   {
            console.log(e.response?.data?.message)
        }   finally {
            this.setLoading(false);
        }
    }
}

export const store = new Store();