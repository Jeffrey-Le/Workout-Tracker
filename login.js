function login() {
    const userId = document.getElementById('login-user-id').value;
    const password = document.getElementById('login-password').value;
  
    if (userId && password) {
      alert('Login successful!');
      // Add further code to process or submit login data as needed
    } else {
      alert('Please fill in all fields.');
    }
  }
  