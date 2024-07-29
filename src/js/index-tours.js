document.addEventListener('DOMContentLoaded', () => {
  fetch('index-tours.json')
    .then(response => response.json())
    .then(toursData => generateToursHTML(toursData))
    .catch(error => console.error('Error fetching the tours data:', error));
});

function generateToursHTML(toursData) {
  const toursContainer = document.getElementById('toursWrapper');

  if (!toursContainer) {
    console.error('Container not found!');
    return;
  }

  const toursWrapper = document.createElement('div');
  toursWrapper.className = 'tours__wrapper';

  toursData.tours.forEach(tour => {
    const tourItem = document.createElement('div');
    tourItem.className = 'tours__item';

    const priceDiv = document.createElement('div');
    priceDiv.className = 'tours__item-label';
    priceDiv.textContent = `${tour.price} тг`;
    tourItem.appendChild(priceDiv);

    const img = document.createElement('img');
    img.className = 'tours__item-img';
    img.src = tour.img;
    img.alt = tour.title;
    tourItem.appendChild(img);

    const title = document.createElement('h4');
    title.className = 'tours__item-title';
    title.textContent = tour.title;
    tourItem.appendChild(title);

    const place = document.createElement('p');
    place.className = 'tours__item-place';
    place.textContent = tour.place;
    tourItem.appendChild(place);

    const date = document.createElement('p');
    date.className = 'tours__item-date';
    tour.date.forEach(dateStr => {
      if (!dateStr) date.appendChild(document.createElement('<br>'));
      const dateP = document.createElement('p');
      dateP.textContent = dateStr;
      date.appendChild(dateP);
    });
    tourItem.appendChild(date);

    toursWrapper.appendChild(tourItem);
  });

  toursContainer.appendChild(toursWrapper);
}
