// Elementos de controle
const menuHome = document.getElementById('menu-home');
const menuVideos = document.getElementById('menu-videos');
const homeSection = document.getElementById('home-section');
const videosSection = document.getElementById('videos-section');
const header = document.querySelector('header');
const toggleSoundBtn = document.getElementById('toggle-sound');

// Vídeos e miniaturas
const videoItems = document.querySelectorAll('.video-slider .list .item');
const videoThumbnails = document.querySelectorAll('.video-slider .thumbnail .thumb-item');
const autoShowElements = document.querySelectorAll('.autoShow');

let itemActive = 0;

// === SLIDER NAVIGATION ===
const next = document.getElementById('next');
const prev = document.getElementById('prev');

// Lista de vídeos do slider
function showSlider() {
  document.querySelector('.video-slider .list .item.active')?.classList.remove('active');
  document.querySelector('.video-slider .thumbnail .item.active')?.classList.remove('active');

  videoItems[itemActive].classList.add('active');
  videoThumbnails[itemActive].classList.add('active');
  setPositionThumbnail();

  document.querySelectorAll('.video-slider .list .item video').forEach(video => {
    video.pause();
    video.currentTime = 0;
    video.removeEventListener('ended', handleVideoEnd);
  });

  const currentVideo = videoItems[itemActive].querySelector('video');
  if (currentVideo) {
    currentVideo.play();
    currentVideo.addEventListener('ended', handleVideoEnd);
    updateSoundIcon(currentVideo);
  }
}

function handleVideoEnd() {
  videoItems[itemActive].classList.remove('active');
  videoThumbnails[itemActive].classList.remove('active');
  itemActive = (itemActive + 1) % videoItems.length;
  videoItems[itemActive].classList.add('active');
  videoThumbnails[itemActive].classList.add('active');
  showSlider();
}

function setPositionThumbnail() {
  const thumbnailActive = document.querySelector('.video-slider .thumbnail .item.active');
  if (!thumbnailActive) return;
  const rect = thumbnailActive.getBoundingClientRect();
  if (rect.left < 0 || rect.right > window.innerWidth) {
    thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }
}

// === VIDEO CONTROLS ===
function pauseAllVideos() {
  videoItems.forEach(item => {
    const video = item.querySelector('video');
    video.pause();
    video.currentTime = 0;
    video.muted = true;
  });
  updateSoundIcon(null);
}

function playCurrentVideo() {
  const currentVideo = videoItems[itemActive].querySelector('video');
  if (currentVideo) {
    currentVideo.play();
    currentVideo.addEventListener('ended', handleVideoEnd);
    updateSoundIcon(currentVideo);
  }
}

function updateSoundIcon(video) {
  if (!toggleSoundBtn) return;
  if (!video) {
    toggleSoundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else {
    toggleSoundBtn.innerHTML = video.muted
      ? '<i class="fa-solid fa-volume-xmark"></i>'
      : '<i class="fa-solid fa-volume-high"></i>';
  }
}

// === EVENTOS ===
menuHome.addEventListener('click', () => {
  homeSection.style.display = 'block';
  videosSection.style.display = 'none';
  header.classList.remove('fixed');
  window.scrollTo(0, 0);
  pauseAllVideos();
});

menuVideos.addEventListener('click', () => {
  homeSection.style.display = 'none';
  videosSection.style.display = 'block';
  header.classList.add('fixed');
  showSlider();
});

toggleSoundBtn.addEventListener('click', () => {
  const currentVideo = videoItems[itemActive].querySelector('video');
  if (currentVideo) {
    currentVideo.muted = !currentVideo.muted;
    updateSoundIcon(currentVideo);
  }
});

videoThumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    if (itemActive !== index) {
      videoItems[itemActive].classList.remove('active');
      videoThumbnails[itemActive].classList.remove('active');
      itemActive = index;
      videoItems[itemActive].classList.add('active');
      videoThumbnails[itemActive].classList.add('active');
      showSlider();
    }
  });
});

next?.addEventListener('click', () => {
  itemActive = (itemActive + 1) % videoItems.length;
  showSlider();
});

prev?.addEventListener('click', () => {
  itemActive = (itemActive - 1 + videoItems.length) % videoItems.length;
  showSlider();
});

// === ANIMAÇÕES SCROLL ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-auto');
    } else {
      entry.target.classList.remove('show-auto');
    }
  });
}, {
  threshold: 0.1
});

autoShowElements.forEach(el => observer.observe(el));

// === Inicialização ===
window.addEventListener('DOMContentLoaded', () => {
  homeSection.style.display = 'block';
  videosSection.style.display = 'none';

  const firstVideo = videoItems[itemActive].querySelector('video');
  if (firstVideo) {
    firstVideo.play();
    firstVideo.addEventListener('ended', handleVideoEnd);
    updateSoundIcon(firstVideo);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav.menu');
  const links = nav.querySelectorAll('a');
  const indicator = nav.querySelector('span');
  let activeIndex = 0; // Posição inicial

  // Inicializa posição do span no ativo
  updateSpanPosition(links[activeIndex]);

  links.forEach((link, index) => {
    // Clique: torna ativo
    link.addEventListener('click', () => {
      activeIndex = index;
      updateSpanPosition(link);
    });

    // Hover: move o span
    link.addEventListener('mouseenter', () => {
      updateSpanPosition(link);
    });

    // Saiu do hover: volta pro ativo
    link.addEventListener('mouseleave', () => {
      updateSpanPosition(links[activeIndex]);
    });
  });

  function updateSpanPosition(targetLink) {
    const left = targetLink.offsetLeft;
    indicator.style.left = `${left}px`;
  }
});

