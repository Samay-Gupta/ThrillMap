function setImageHeight() {
  var screenHeight =
    window.innerHeight || document.documentElement.clientHeight;
  var img = document.querySelector('.responsive-image') as HTMLImageElement;
  if (img) {
    img.style.height = screenHeight * (3 / 5) + 'px';
  }
  var body = document.querySelector('body');
  if (body) {
    body.style.minHeight = screenHeight + 'px';
  }
}

function loadPage() {
  window.onload = setImageHeight;
  window.onresize = setImageHeight;
}

loadPage();