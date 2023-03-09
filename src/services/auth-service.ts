import { AxiosError, AxiosResponse } from 'axios';
import { api } from '../api/config';
import { FetchedError, User } from '../types/data.types';

interface LoginDto {
  identifier: string;
  password: string;
}

interface RegisterDto {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

type LoginResponse = {
  data: User;
};

export abstract class AuthService {
  static async login(dto: LoginDto) {
    const response = await api.post<User | FetchedError>('/api/auth/locall', dto).catch((err) => {
      const { data } = err.response;
      throw new AxiosError(JSON.stringify(data));
    });
    return response?.data;
  }

  static async registration(dto: RegisterDto) {
    const response = await api.post<User | FetchedError>('/api/auth/local/register', dto).catch((err) => {
      const { data } = err.response;
      throw new AxiosError(JSON.stringify(data));
    });
    return response?.data;
  }

  static async rememberPassword(email: string) {
    const response = await api.post<{ ok: boolean } | FetchedError>('/api/auth/forgot-password', {email}).catch((err) => {
      const { data } = err.response;
      throw new AxiosError(JSON.stringify(data));
    });
    return response?.data;
  }

  static async resetPassword(password: string, passwordConfirmation: string, code: string){
      const response = await api.post<User | FetchedError>('/api/auth/reset-password', {password, passwordConfirmation, code}).catch((err) => {
          const { data } = err.response;
          throw new AxiosError(JSON.stringify(data));
      });
      return response?.data;
  }
}
