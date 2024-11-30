async function submitForm() {
  const userId = document.getElementById('user-id').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const email = document.getElementById('email').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  if (userId && password && email) {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userId,
          email: email,
          password: password,
          age: 25, // Example age
          gender: 'M', // Example gender
          height: 175, // Example height in cm
        }),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
      } else if (response.status === 409) {
        alert('User with this username or email already exists.');
      } else {
        alert('Error submitting the form.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
    }
  } else {
    alert('Please fill in all fields.');
  }
}
