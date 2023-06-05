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
}
