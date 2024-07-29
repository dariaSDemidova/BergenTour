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