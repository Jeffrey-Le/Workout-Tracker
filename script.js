 // Function to handle user registration
function submitForm() {
    const userId = document.getElementById('user-id').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const email = document.getElementById('email').value;
  
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
  
    if (userId && password && email) {
        // Prepare the request payload
        const registrationData = {
            username: userId,
            password: password,
            email: email
        };
        
        // Make a POST request to the server to register
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('User with this username or email already exists.');
            }
            return response.text();
        })
        .then(data => {
            alert('Form submitted successfully! ' + data);
            // Redirect or proceed further in the application
        })
        .catch(error => {
            alert('Registration failed: ' + error.message);
        });
    } else {
        alert('Please fill in all fields.');
    }
}