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
      alert('Form submitted successfully!');
      // Add further code to process or submit the data if needed
    } else {
      alert('Please fill in all fields.');
    }
  }
  