    //открытие/закрытие модального окна
    document.addEventListener('DOMContentLoaded', (e) => {
        const popup = document.getElementById('popup');
        const overlay = document.getElementById('overlay');
        const openButton = document.getElementById('contacts__button');
        const closeButton = document.getElementById('popup__close');
    
        openButton.addEventListener('click', () => {
            overlay.style.display = 'block';
            popup.style.display = 'block';
        });
    
        closeButton.addEventListener('click', () => {
            overlay.style.display = 'none';
            popup.style.display = 'none';
        });
    });
    

    //подключение api городов Казахстана
    document.addEventListener('DOMContentLoaded', function() {
        const citiesSelect = document.getElementById('cities-select');
    
        const query = `
            [out:json];
            area["ISO3166-1"="KZ"][admin_level=2];
            node["place"="city"](area);
            out body;
        `;
        
        const apiUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.elements.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.tags.name;
                    option.textContent = city.tags.name;
                    citiesSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching city data:', error));
    });
    

    //валидация телефонного номера 
    document.addEventListener('DOMContentLoaded', function () {
        const phoneInput = document.getElementById('phone');
        const submitButton = document.getElementById('submit-button');
        const phoneError = document.getElementById('phone-error');

        function validatePhoneNumber(phone) {
            const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
            return phoneRegex.test(phone);
        }

        function formatPhoneNumber(value) {
            const cleanValue = value.replace(/\D/g, '');
            let formattedValue = '+7 ';

            if (cleanValue.length > 1) {
                formattedValue += '(' + cleanValue.substring(1, 4);
            }
            if (cleanValue.length >= 5) {
                formattedValue += ') ' + cleanValue.substring(4, 7);
            }
            if (cleanValue.length >= 8) {
                formattedValue += '-' + cleanValue.substring(7, 9);
            }
            if (cleanValue.length >= 10) {
                formattedValue += '-' + cleanValue.substring(9, 11);
            }

            return formattedValue;
        }

        phoneInput.addEventListener('input', function () {
            const formattedValue = formatPhoneNumber(phoneInput.value);
            phoneInput.value = formattedValue;

            if (validatePhoneNumber(formattedValue)) {
                phoneError.textContent = '';
                submitButton.disabled = false;
            } else {
                phoneError.textContent = 'Пожалуйста, введите корректный номер телефона';
                submitButton.disabled = true;
            }
        });

        phoneInput.addEventListener('keypress', function (e) {
            if (!/\d/.test(e.key)) {
                e.preventDefault();
            }
        });
    });