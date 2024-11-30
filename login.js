async function login() {
  const userId = document.getElementById('login-user-id').value;
  const password = document.getElementById('login-password').value;

  if (userId && password) {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userId,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json(); // Backend returns a token
        const token = data.token;
        localStorage.setItem('authToken', token); // Store token in localStorage
        alert('Login successful!');
        // Redirect or load a new page if needed
      } else if (response.status === 401) {
        alert('Invalid username or password.');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred.');
    }
  } else {
    alert('Please fill in all fields.');
  }
}
