// Set the number of days until redirection (7 days in milliseconds)
const redirectDelay = 7 * 24 * 60 * 60 * 1000;

// Set a timeout to redirect the user after the specified delay
setTimeout(() => {
  window.location.href = 'index.html'; // Replace 'index.html' with your actual index page URL
}, redirectDelay);

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