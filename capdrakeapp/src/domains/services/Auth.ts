import axiosInstance from '../config/Axios';

export namespace AuthService {
	export const login = (
		username: string,
		password: string,
		stayLoggedIn: boolean
	) => {
		return axiosInstance.post('/auth/login', {
			username,
			password,
			stayLoggedIn,
		});
	};

	export const logout = () => {
		return axiosInstance.post('/auth/logout');
	};

	export const register = (
		username: string,
		email: string,
		password: string
	) => {
		return axiosInstance.post('/auth/register', {
			username,
			email,
			password,
		});
	};

	export const healthAuth = (token: string) => {
		return axiosInstance.get('/auth', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	};
}
