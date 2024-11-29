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

// Get all tags for a specific store
export const getTagsForStore = async (store_id) => {
  try {
    const response = await apiClient.get(`/store/${store_id}/tag`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Create a new tag for a specific store
export const createTagForStore = async (store_id, tagData) => {
  try {
    const response = await apiClient.post(`/store/${store_id}/tag`, tagData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Assign a tag to an item
export const assignTagToItem = async (item_id, tag_id) => {
  try {
    const response = await apiClient.post(`/item/${item_id}/tag/${tag_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Unassign a tag from an item
export const unassignTagFromItem = async (item_id, tag_id) => {
  try {
    const response = await apiClient.delete(`/item/${item_id}/tag/${tag_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Get details of a specific tag
export const getTag = async (tag_id) => {
  try {
    const response = await apiClient.get(`/tag/${tag_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Delete a specific tag
export const deleteTag = async (tag_id) => {
  try {
    const response = await apiClient.delete(`/tag/${tag_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
