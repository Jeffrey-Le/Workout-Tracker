// src/services/auth.js
const API_URL = 'http://localhost:5000';

class AuthService {
  static async login(username) {
    // For development only - simplified login
    try {
      // In production, this would be a real login endpoint
      const token = btoa(username); // Simple base64 encoding for demo
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ username, user_id: 27 }));
      return true;
    } catch (error) {
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
    return localStorage.getItem('token');
  }

  static isAuthenticated() {
    return !!this.getToken();
  }
}

export default AuthService;