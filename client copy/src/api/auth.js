import axiosInstance from './axiosInstance';

export async function loginUser(credentials) {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
}

export async function signupUser(data) {
  const response = await axiosInstance.post('/auth/signup', data);
  return response.data;
}
