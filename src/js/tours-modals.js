document.addEventListener('DOMContentLoaded', () => {
  fetch('index-tours.json')
    .then((response) => response.json())
    .then((toursData) => generateTourModalHTML(toursData))
    .catch((error) => console.error('Error fetching the tour data:', error));
});

function generateTourModalHTML(toursData) {
  const toursModal = document.getElementById('toursModalBody');

  if (!toursModal) {
    console.error('Modal container not found!');
    return;
  }
  toursData.tours.forEach((tour) => {
    const dateDiv = document.createElement('div');
    dateDiv.className = 'tours-modal__date';
    dateDiv.textContent = tour.date;
    toursModal.appendChild(dateDiv);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'tours-modal__content';

    const title = document.createElement('h2');
    title.className = 'tours-modal__title';
    title.textContent = tour.title;
    contentDiv.appendChild(title);

    const list = document.createElement('ul');
    list.className = 'tours-modal__list';
    tour.content.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.className = 'tours-modal__item';
      listItem.textContent = item;
      list.appendChild(listItem);
    });
    contentDiv.appendChild(list);
    toursModal.appendChild(contentDiv);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'tours-modal__info';

    const priceWrapper = document.createElement('div');
    priceWrapper.className = 'tours-modal__price-wrapper';

    const priceDiv = document.createElement('div');
    priceDiv.className = 'tours-modal__price';
    priceDiv.innerHTML = `<span class="price-title">Стоимость:</span> <span class="price-value">${tour.price}</span>`;
    priceWrapper.appendChild(priceDiv);

    const prepaymentDiv = document.createElement('div');
    prepaymentDiv.className = 'tours-modal__price';
    prepaymentDiv.innerHTML = `<span class="price-title">Предоплата:</span> <span class="price-value">${tour.prepayment}</span>`;
    priceWrapper.appendChild(prepaymentDiv);

    // const priceInfoDiv = document.createElement('div');
    // priceInfoDiv.className = 'tours-modal__price-info';
    // priceInfoDiv.textContent = tourData.price_info;
    // priceWrapper.appendChild(priceInfoDiv);

    infoDiv.appendChild(priceWrapper);

    const includeWrapper = document.createElement('div');
    includeWrapper.className = 'tours-modal__include-wrapper';

    const includeTitle = document.createElement('div');
    includeTitle.className = 'tours-modal__include-title';
    includeTitle.textContent = 'В стоимость входят:';
    includeWrapper.appendChild(includeTitle);

    const includeList = document.createElement('ul');
    includeList.className = 'tours-modal__include-list';
    tour.included.forEach((item) => {
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
    tour.not_included.forEach((item) => {
      const notIncludeItem = document.createElement('li');
      notIncludeItem.className = 'tours-modal__include-item';
      notIncludeItem.textContent = item;
      notIncludeList.appendChild(notIncludeItem);
    });
    notIncludeWrapper.appendChild(notIncludeList);

    infoDiv.appendChild(notIncludeWrapper);

    contentDiv.appendChild(infoDiv);
    toursModal.appendChild(contentDiv);

    const flightDiv = document.createElement('div');
    flightDiv.className = 'tours-modal__flight';
    flightDiv.textContent = toursData.flight_info;
  });
  toursModal.appendChild(flightDiv);
}
