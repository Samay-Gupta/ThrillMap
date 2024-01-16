function setImageHeight(){
    var screenHeight = window.innerHeight || document.documentElement.clientHeight;
    var img = document.querySelector('.responsive-image');
    if (img) {
        img.style.height = screenHeight * (2 / 3) + 'px';
    }
};

window.onload = setImageHeight;
window.onresize = setImageHeight;

function getQueryParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

function setupOnDataLoad(onDataLoad) {
    document.addEventListener('DOMContentLoaded', function() {
        fetch('http://127.0.0.1:8081/data/thrill_map.json')
            .then(response => response.json())
            .then(data => onDataLoad(data))
            .catch(error => console.error('Error fetching data:', error));
    });
}
