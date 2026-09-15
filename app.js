document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.logos .item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const logosContainer = document.querySelector('.logos');
    
    let isThrottled = false;
    let active = 1;

    // Initialization checks
    if (items.length > 0) {
        if (active < 0) active = 0;
        if (active > items.length - 1) active = items.length - 1;
    } else {
        active = 0;
    }

    // Carousel 3D placement logic
    function loadShow() {
        items.forEach(item => {
            item.style.transition = 'transform 0.8s, filter 0.5s, opacity 0.5s';
        });

        if (items.length === 0) return;

        // Active center item
        if (items[active]) {
            items[active].style.transform = `translateX(-50%) scale(1)`;
            items[active].style.zIndex = 1;
            items[active].style.filter = 'none';
            items[active].style.opacity = 1;
        }

        // Items to the right
        for (let i = active + 1; i < items.length; i++) {
            let stt = i - active;
            items[i].style.transform = `translateX(calc(-50% + ${120 * stt}px)) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }

        // Items to the left
        for (let i = active - 1; i >= 0; i--) {
            let stt = active - i;
            items[i].style.transform = `translateX(calc(-50% - ${120 * stt}px)) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }

        updateCarouselButtons();
    }

    // Scroll handling for the carousel area
    function onWheel(e) {
        // Prevent default scroll behavior only when actively over the carousel container
        e.preventDefault(); 
        
        if (isThrottled) return;
        isThrottled = true;
        setTimeout(() => isThrottled = false, 400);

        if (e.deltaY > 0 && active < items.length - 1) {
            active++;
            loadShow();
        } else if (e.deltaY < 0 && active > 0) {
            active--;
            loadShow();
        }
    }

    // Attach scroll listener to the container rather than overlays
    if (logosContainer) {
        logosContainer.addEventListener('wheel', onWheel, { passive: false });
    }

    if (items.length > 0) {
        loadShow();
    }

    // Home Section Arrow animation logic
    const homeSection = document.querySelector('.home-section');
    const arrowWrapper = homeSection ? homeSection.querySelector('.arrow-wrapper') : null;

    if (homeSection && arrowWrapper) {
        const arrowObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const ratio = entry.intersectionRatio;
                arrowWrapper.style.opacity = ratio > 0.25 ? ratio : 0;
            });
        }, {
            root: null,
            threshold: Array.from({ length: 101 }, (_, i) => i / 100)
        });
        arrowObserver.observe(homeSection);
    }

    // Projects card logic (expand on click, play video on hover)
    const cards = document.querySelectorAll('.card-project');

    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.closest('a')) return;
            this.classList.toggle('active');
        });

        const video = card.querySelector('video');
        if (video) {
            card.addEventListener('mouseenter', () => {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Error attempting to play the video:", error);
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

    // Buttons logic
    function updateCarouselButtons() {
        if (!prevBtn || !nextBtn) return;
        if (active <= 0) {
            prevBtn.setAttribute('disabled', 'true');
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.removeAttribute('disabled');
            prevBtn.classList.remove('disabled');
        }

        if (active >= items.length - 1) {
            nextBtn.setAttribute('disabled', 'true');
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.removeAttribute('disabled');
            nextBtn.classList.remove('disabled');
        }
    }

    function onPrevClick() {
        if (active > 0) {
            active--;
            loadShow();
        }
    }

    function onNextClick() {
        if (active < items.length - 1) {
            active++;
            loadShow();
        }
    }

    function enableControls() {
        if (!prevBtn || !nextBtn) return;
        prevBtn.removeEventListener('click', onPrevClick);
        nextBtn.removeEventListener('click', onNextClick);

        prevBtn.addEventListener('click', onPrevClick);
        nextBtn.addEventListener('click', onNextClick);

        prevBtn.removeAttribute('disabled');
        nextBtn.removeAttribute('disabled');

        updateCarouselButtons();
    }

    function disableControls() {
        if (!prevBtn || !nextBtn) return;
        prevBtn.removeEventListener('click', onPrevClick);
        nextBtn.removeEventListener('click', onNextClick);

        prevBtn.setAttribute('disabled', 'true');
        nextBtn.setAttribute('disabled', 'true');
    }

    // Media Query listener for mobile controls
    const mql = window.matchMedia('(max-width: 1024px)');

    function handleMqChange(e) {
        const matches = (typeof e.matches === 'boolean') ? e.matches : mql.matches;
        if (matches) {
            enableControls();
        } else {
            disableControls();
        }
    }

    if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', handleMqChange);
    } else if (typeof mql.addListener === 'function') {
        mql.addListener(handleMqChange);
    }

    handleMqChange(mql);
    updateCarouselButtons();
});