import apiClient from './auth';

// Centralized error handler
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status outside the 2xx range
    throw new Error(error.response.data.message || 'An error occurred on the server.');
  } else if (error.request) {
    // Request was made, but no response received
    throw new Error('No response received from the server.');
  } else {
    // Something else happened
    throw new Error('An error occurred while processing your request.');
  }
};

// Fetch all stores
export const getStores = async () => {
  try {
    const response = await apiClient.get('/store');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch a specific store by ID
export const getStore = async (store_id) => {
  try {
    const response = await apiClient.get(`/store/${store_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Create a new store
export const createStore = async (storeData) => {
  try {
    const response = await apiClient.post('/store', storeData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Update an existing store
export const updateStore = async (store_id, storeData) => {
  try {
    const response = await apiClient.put(`/store/${store_id}`, storeData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Delete a store
export const deleteStore = async (store_id) => {
  try {
    const response = await apiClient.delete(`/store/${store_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
