import axios from 'axios';
import AuthService from './auth';

const API_URL = 'http://localhost:5001';

class ApiService {
  static async searchWorkouts(date, type) {
    try {
      // Retrieve the token from localStorage or AuthService
      const token = AuthService.getToken() || localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Configure headers and query parameters
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ...(date && { date }),
          ...(type && { type }),
        },
      };

      // Make the GET request with Axios
      const response = await axios.get(`${API_URL}/workouts/search`, config);

      // Return the response data
      return response.data;
    } catch (error) {
      console.error('Error fetching workouts:', error);

      // Handle Axios-specific error objects
      if (error.response) {
        throw new Error(
          error.response.data?.message || `Request failed: ${error.response.status}`
        );
      }
      throw error;
    }
  }
}

export default ApiService;
