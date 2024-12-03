// src/services/auth.js
const API_URL = 'http://localhost:5000/api';

class AuthService {
  static async login(username) {
    // For development only - simplified login
    try {
      console.log("In Auth Service")
      // In production, this would be a real login endpoint
      // const token = btoa(username); // Simple base64 encoding for demo
      // localStorage.setItem('token', token);
      const token = localStorage.getItem('authToken');

        const response = await fetch(`${API_URL}/users`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          },
      });
      

      if (!response.ok) {
          throw new Error('Failed to log workout');
      }

      const user = await response.json();

      console.log(user);

      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  static getToken() {
    return localStorage.getItem('authToken');
  }

  static isAuthenticated() {
    return !!this.getToken();
  }
}

export default AuthService;