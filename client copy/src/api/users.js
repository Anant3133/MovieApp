import axiosInstance from './axiosInstance';

export const fetchUserProfile = async () => {
  const response = await axiosInstance.get('/users/profile');
  return response.data; 
};

export const updateUserProfile = async (profileData) => {
  const response = await axiosInstance.put('/users/profile', profileData);
  return response.data; 
};

export const changePassword = async (passwordData) => {
  const response = await axiosInstance.post('/users/change-password', passwordData);
  return response.data; 
};
