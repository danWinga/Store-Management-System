import apiClient from './auth'; // Import apiClient from auth.js

// Centralized error handler
const handleApiError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || 'Server error occurred.');
  } else if (error.request) {
    throw new Error('No response received from the server.');
  } else {
    throw new Error('An error occurred while processing the request.');
  }
};

// Fetch all items
export const fetchItems = async () => {
  try {
    const response = await apiClient.get('/item');
    return response.data; // Return the actual data from the response
  } catch (error) {
    handleApiError(error);
  }
};

// Create a new item
export const createItem = async (data) => {
  try {
    const response = await apiClient.post('/item', data);
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

// Update an item
export const updateItem = async (id, data) => {
  try {
    const response = await apiClient.put(`/item/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Delete an item
export const deleteItem = async (item_id) => {
  try {
    const response = await apiClient.delete(`/item/${item_id}`);
    return response;
  } catch (error) {
    handleApiError(error);
  }
};
