function login() {
    const userId = document.getElementById('login-user-id').value;
    const password = document.getElementById('login-password').value;
	
	if (userId && password) {
        // Prepare the request payload
        const loginData = {
            username: userId,
            password: password
        };
        
        // Make a POST request to the server to login
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            return response.json();
        })
        .then(data => {
            // Save the JWT token to localStorage
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            // Please fill redirect code to next web page
		
        })
        .catch(error => {
            alert('Login failed: ' + error.message);
        });
    } else {
        alert('Please fill in all fields.');
    }
}