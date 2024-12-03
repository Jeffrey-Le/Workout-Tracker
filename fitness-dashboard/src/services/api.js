// src/services/api.js
import AuthService from './auth';

const API_URL = 'http://localhost:5000';

class ApiService {
  static async searchWorkouts(date, type) {
    try {
        //const token = AuthService.getToken();
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token');
        }

        let url = `${API_URL}/workouts/search?`;
        if (date) url += `date=${date}&`;
        if (type) url += `type=${type}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Add this line
        });

        if (!response.ok) {
            throw new Error('Failed to fetch workouts');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching workouts:', error);
        throw error;
    }
}
}

export default ApiService;