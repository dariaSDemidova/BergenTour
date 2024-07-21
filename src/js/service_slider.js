window.addEventListener('DOMContentLoaded', () => {
  // slider
  let position = 1;

  const slidesToScroll = 1,
    track = document.querySelector('.service-slider__items'),
    items = document.querySelectorAll('.service-slider__item'),
    btnPrev = document.querySelector('.service-slider__btn_prev'),
    btnNext = document.querySelector('.service-slider__btn_next');

  const showSlides = (position) => {
    track.style.transform = `translateX(-${(position - 1) * 100}%)`;
  }

  btnPrev.addEventListener('click', () => {
    if (position === 1) {
      position = items.length;
    } else {
      position -= slidesToScroll;
    }
    showSlides(position);
  });

  btnNext.addEventListener('click', () => {
    if (position >= items.length) {
      position = 1;
    } else {
      position += slidesToScroll;
    }
    showSlides(position);
  });
});
