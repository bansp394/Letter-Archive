// Show discovery hint after 10 seconds
const discoveryHint = document.getElementById('discoveryHint');

setTimeout(function() {
  discoveryHint.classList.add('show');
}, 1000); // 10 seconds



// Image crossfade every 60 seconds
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
let currentImage = 1;

setInterval(function() {
  if (currentImage === 1) {
    image1.classList.remove('active');
    image2.classList.add('active');
    currentImage = 2;
  } else {
    image2.classList.remove('active');
    image1.classList.add('active');
    currentImage = 1;
  }
}, 10000); // 60 seconds
