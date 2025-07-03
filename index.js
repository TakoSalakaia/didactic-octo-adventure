// საათი
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
  document.getElementById('clock').textContent = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// countdown
function updateCountdown() {
  const targetDate = new Date('2025-07-04T20:00:00');
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById('countdown').textContent = "ლექცია დაიწყო!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  document.getElementById('countdown').textContent = `ლექციამდე დარჩა: ${days} დღე ${hours} სთ ${minutes} წთ`;
}
setInterval(updateCountdown, 60000);
updateCountdown();

// სლაიდერი
const slides = document.querySelectorAll('.slide-item');
const pagination = document.querySelector('.pagination');
let activeIndex = 0;

// pagination ღილაკები
slides.forEach((_, index) => {
  const btn = document.createElement('button');
  btn.addEventListener('click', () => {
    activeIndex = index;
    renderSlides();
  });
  pagination.appendChild(btn);
});
const pagBtns = document.querySelectorAll('.pagination button');

function renderSlides() {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === activeIndex);
  });
  pagBtns.forEach((btn, idx) => {
    btn.classList.toggle('active', idx === activeIndex);
  });
}
renderSlides();

function nextSlide() {
  activeIndex = (activeIndex + 1) % slides.length;
  renderSlides();
}
function prevSlide() {
  activeIndex = (activeIndex - 1 + slides.length) % slides.length;
  renderSlides();
}

let interval = setInterval(nextSlide, 3000);

const sliderWrapper = document.getElementById('sliderWrapper');
sliderWrapper.addEventListener('mouseenter', () => {
  clearInterval(interval);
});
sliderWrapper.addEventListener('mouseleave', () => {
  interval = setInterval(nextSlide, 3000);
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') prevSlide();
  if (e.code === 'ArrowRight') nextSlide();
});
