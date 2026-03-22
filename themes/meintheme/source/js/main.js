const mainContainer = document.querySelector('.main-container');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.topbar-nav a');

let currentSection = 0;
let isAnimating = false;

// --------------- 横向滚动切换 ---------------
function scrollToSection(index) {
  if (index < 0) index = 0;
  if (index >= sections.length) index = sections.length - 1;

  currentSection = index;
  mainContainer.style.transform = `translateX(-${index * 100}vw)`;

  // 更新导航栏 active
  navLinks.forEach(link => link.classList.remove('active'));
  if(index === 0) navLinks[0].classList.add('active');
  else if(index === 1) navLinks[1].classList.add('active');
  else if(index === 2) navLinks[2].classList.add('active');
}

// 鼠标滚轮切换
let scrollDebounce = false;
window.addEventListener('wheel', e => {
  if(scrollDebounce) return;
  scrollDebounce = true;
  setTimeout(() => scrollDebounce = false, 800);

  if(e.deltaY > 0) scrollToSection(currentSection + 1);
  else if(e.deltaY < 0) scrollToSection(currentSection - 1);
});

// 点击导航切换
navLinks.forEach((link, i) => {
  link.addEventListener('click', () => scrollToSection(i));
});

// 初始显示第一屏
scrollToSection(0);

// --------------- Post Section 卡片轮播 ---------------
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const pages = document.querySelectorAll('.carousel-pagination .page');

let currentSlide = 0;
const slides = document.querySelectorAll('.post-card');
const totalSlides = slides.length;

function updateCarousel() {
  const offset = currentSlide * (slides[0].offsetWidth + 32); // 32 = margin左右
  track.style.transform = `translateX(-${offset}px)`;
  pages.forEach((p, i) => p.classList.toggle('active', i === currentSlide));
}

if(prevBtn) prevBtn.addEventListener('click', () => {
  currentSlide = Math.max(currentSlide - 1, 0);
  updateCarousel();
});

if(nextBtn) nextBtn.addEventListener('click', () => {
  currentSlide = Math.min(currentSlide + 1, totalSlides - 1);
  updateCarousel();
});

// 分页点击
pages.forEach((p, i) => {
  p.addEventListener('click', () => {
    currentSlide = i;
    updateCarousel();
  });
});

// 初始化轮播
// //之后需修改
updateCarousel();