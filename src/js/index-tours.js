document.addEventListener('DOMContentLoaded', () => {
  fetch('index-tours.json')
    .then(response => response.json())
    .then(toursData => {
      generateToursCards(toursData);
      const toursCards = document.querySelectorAll('.tours__item');
      toursCards.forEach(card => {
        card.addEventListener('click', () => {
          const tourId = card.getAttribute('data-tour-id');
          const tourInfo = toursData.tours.find((element) => element.id == tourId);
          if (tourInfo) {
            generateTourModal(tourInfo);
          }
        });
      });
    })
    .catch(error => console.error('Error fetching the tours data:', error));
});

function generateToursCards(toursData) {
  const toursContainer = document.getElementById('toursWrapper');

  if (!toursContainer) {
    console.error('Container not found!');
    return;
  }

  const toursWrapper = document.createElement('div');
  toursWrapper.className = 'tours__wrapper';

  toursData.tours.forEach(tour => {
    const tourItem = document.createElement('div');
    tourItem.setAttribute('data-tour-id', tour.id);
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

function generateTourModal(tourInfo) {
  const modal = document.getElementById('toursModal');
  const modalBody = document.getElementById('toursModalBody');
  modalBody.innerHTML = '';

  const dateDiv = document.createElement('div');
  dateDiv.className = 'tours-modal__date';
  dateDiv.textContent = tourInfo.date;
  modalBody.appendChild(dateDiv);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'tours-modal__content';

  const title = document.createElement('h2');
  title.className = 'tours-modal__title';
  title.textContent = tourInfo.title;
  contentDiv.appendChild(title);

  const list = document.createElement('ul');
  list.className = 'tours-modal__list';
  tourInfo.content.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'tours-modal__item';
    listItem.textContent = item;
    list.appendChild(listItem);
  });
  contentDiv.appendChild(list);
  modalBody.appendChild(contentDiv);

  const priceWrapper = document.createElement('div');
  priceWrapper.className = 'tours-modal__price-wrapper';

  const priceDiv = document.createElement('div');
  priceDiv.className = 'tours-modal__price';
  priceDiv.innerHTML = `<span class="price-title">Стоимость:</span> <span class="price-value">${tourInfo.price}</span> ₸`;
  priceWrapper.appendChild(priceDiv);

  const prepaymentDiv = document.createElement('div');
  prepaymentDiv.className = 'tours-modal__price';
  prepaymentDiv.innerHTML = `<span class="price-title">Предоплата:</span> <span class="price-value">${tourInfo.prepayment}</span> ₸`;
  priceWrapper.appendChild(prepaymentDiv);

  const priceInfoDiv = document.createElement('div');
  priceInfoDiv.className = 'tours-modal__price-info';
  priceInfoDiv.textContent = "остаток после получения визы";
  priceWrapper.appendChild(priceInfoDiv);

  contentDiv.appendChild(priceWrapper);

  const infoDiv = document.createElement('div');
  infoDiv.className = 'tours-modal__info';

  contentDiv.appendChild(infoDiv);

  const includeWrapper = document.createElement('div');
  includeWrapper.className = 'tours-modal__include-wrapper';

  const includeTitle = document.createElement('div');
  includeTitle.className = 'tours-modal__include-title';
  includeTitle.textContent = 'В стоимость входят:';
  includeWrapper.appendChild(includeTitle);

  const includeList = document.createElement('ul');
  includeList.className = 'tours-modal__include-list';
  tourInfo.included.forEach((item) => {
    const includeItem = document.createElement('li');
    includeItem.className = 'tours-modal__include-item';
    includeItem.innerHTML = item;
    includeList.appendChild(includeItem);
  });
  includeWrapper.appendChild(includeList);

  infoDiv.appendChild(includeWrapper);

  const notIncludeWrapper = document.createElement('div');
  notIncludeWrapper.className = 'tours-modal__include-wrapper';

  const notIncludeTitle = document.createElement('div');
  notIncludeTitle.className = 'tours-modal__include-title';
  notIncludeTitle.textContent = 'В стоимость не входят:';
  notIncludeWrapper.appendChild(notIncludeTitle);

  const notIncludeList = document.createElement('ul');
  notIncludeList.className = 'tours-modal__include-list';
  tourInfo.not_included.forEach((item) => {
    const notIncludeItem = document.createElement('li');
    notIncludeItem.className = 'tours-modal__include-item';
    notIncludeItem.textContent = item;
    notIncludeList.appendChild(notIncludeItem);
  });
  notIncludeWrapper.appendChild(notIncludeList);

  infoDiv.appendChild(notIncludeWrapper);

  contentDiv.appendChild(infoDiv);
  modalBody.appendChild(contentDiv);

  const flightDiv = document.createElement('div');
  flightDiv.className = 'tours-modal__flight';
  flightDiv.textContent = tourInfo.flight_info;
  modalBody.appendChild(flightDiv);

  modal.style.display = 'block';

  document.body.classList.add('tours-modal-open');
}

function closeTourModal() {
  document.getElementById('toursModal').style.display = 'none';
  document.body.classList.remove('tours-modal-open');
}

document.getElementById('toursModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeTourModal();
  }
});
