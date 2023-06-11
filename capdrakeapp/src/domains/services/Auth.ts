import axiosInstance from '../config/Axios';

export namespace AuthService {
	export const login = (username: string, password: string) => {
		return axiosInstance.post('/v1/auth/login', {
			username,
			password,
		});
	};

	export const logout = () => {
		return axiosInstance.post('/v1/auth/logout');
	};

	export const register = (
		username: string,
		email: string,
		password: string
	) => {
		return axiosInstance.post('/v1/auth/register', {
			username,
			email,
			password,
		});
	};

	export const healthAuth = (token: string) => {
		return axiosInstance.get('/v1/auth/health', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	};
}
