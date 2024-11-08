document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault(); 
    
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
    
      
      if (username === 'admin' && password === 'admin') {
        
        document.getElementById("message").innerHTML="log in successfully";
        window.location.href = './convertor.html'; 
      } else {
        
        document.getElementById('error-message').textContent = 'Invalid username or password.';
      }
    });
    