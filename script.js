const authCodeInput = document.createElement('input');
authCodeInput.setAttribute('type', 'text');
authCodeInput.setAttribute('placeholder', 'Enter your authorization code');
document.querySelector('.login-box').appendChild(authCodeInput);

const authButton = document.createElement('button');
authButton.textContent = 'LOGIN';
document.querySelector('.login-box').appendChild(authButton);

let authCodeAttempts = 0;
const validAuthCodes = ['AUH:652011371', 'AUH:652011321', 'AUH:65201156'];

authButton.addEventListener('click', () => {
  authCodeAttempts++;
  const enteredCode = authCodeInput.value;

  if (validAuthCodes.includes(enteredCode)) {
    window.location.href = '/Home/Home.html'; // Redirect to Home.html
  } else if (authCodeAttempts < 3) {
    alert('Your Authorization Code is Wrong. Please try again.');
  } else {
    alert('Too many attempts. Please contact support.');
  }
});

// Set the 5-second interval
setInterval(() => {
  authCodeAttempts = 0;
}, 5000);

document.addEventListener('contextmenu', event=> event.preventDefault()); 
document.onkeydown = function(e) { 
if(event.keyCode == 123) { 
return false; 
} 
if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){ 
return false; 
} 
if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){ 
return false; 
} 
if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){ 
return false; 
} 
} 

authButton.addEventListener('click', () => {
  const enteredCode = authCodeInput.value;
  fetch('/auth', {
    method: 'POST',
    body: JSON.stringify({ code: enteredCode })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      window.location.href = '/Home/Home.html'; // Redirect if successful
    } else {
      alert(data.error); // Show error message
    }
  });
});

function updateVisitorCount() {
  fetch('/visitors') // Replace '/visitors' with your server endpoint
    .then(response => response.json())
    .then(data => {
      document.getElementById('visitor-count').textContent = data.count;
    })
    .catch(error => {
      console.error('Error fetching visitor count:', error);
      document.getElementById('visitor-count').textContent = 'NO AMOUNT OF VISITORS';
    });
}
// Update the count every 5 seconds (adjust as needed)
setInterval(updateVisitorCount, 5000);
// Initial update on page load
updateVisitorCount();