function createListElement(url, imageURL, name, content) {
    const elementLink = document.createElement('a');
    elementLink.className = 'list-info';
    elementLink.href = url;

    const image = document.createElement('img');
    image.src = imageURL;
    image.className = 'list-image';
    elementLink.appendChild(image);

    const infoContainer = document.createElement('div');
    infoContainer.className = 'list-container';

    const title = document.createElement('h3');
    title.textContent = name;
    infoContainer.appendChild(title);

    const description = document.createElement('p');
    description.textContent = content;
    infoContainer.appendChild(description);

    elementLink.appendChild(infoContainer);

    return elementLink;
}

function createListView(containerDiv, dataList, createDataElement) {
    const parentContainer = document.getElementById(containerDiv);

    dataList.forEach(data => {
        parentContainer.appendChild(createDataElement(data));
    });
}