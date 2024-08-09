document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const menuItems = document.querySelectorAll('.menu__item');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger-active');
        nav.classList.toggle('nav-active');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('hamburger-active');
            nav.classList.remove('nav-active');
        });
    });
});