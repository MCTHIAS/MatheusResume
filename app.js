document.addEventListener("DOMContentLoaded", function () {
    const overlays = document.querySelectorAll('.iframe-overlay');
    const items = document.querySelectorAll('.logos .item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let isThrottled = false;
    let active = 1;

    if (items.length > 0) {
        if (active < 0) active = 0;
        if (active > items.length - 1) active = items.length - 1;
    } else {
        active = 0;
    }

    function blockPageScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    overlays.forEach(overlay => {
        overlay.addEventListener('mouseenter', () => {
            window.addEventListener('wheel', blockPageScroll, { passive: false });
            window.addEventListener('touchmove', blockPageScroll, { passive: false });
        });
        overlay.addEventListener('mouseleave', () => {
            window.removeEventListener('wheel', blockPageScroll, { passive: false });
            window.removeEventListener('touchmove', blockPageScroll, { passive: false });
        });
        overlay.addEventListener('wheel', onWheel, { passive: false });
    });

    function loadShow() {
        items.forEach(item => {
            item.style.transition = 'transform 0.8s, filter 0.5s, opacity 0.5s';
        });

        if (items.length === 0) return;

        if (items[active]) {
            items[active].style.transform = `translateX(-50%) scale(1)`;
            items[active].style.zIndex = 1;
            items[active].style.filter = 'none';
            items[active].style.opacity = 1;
        }
        for (let i = active + 1; i < items.length; i++) {
            let stt = i - active;
            items[i].style.transform = `translateX(calc(-50% + ${120 * stt}px)) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
        for (let i = active - 1; i >= 0; i--) {
            let stt = active - i;
            items[i].style.transform = `translateX(calc(-50% - ${120 * stt}px)) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }

        updateCarouselButtons();
    }

    function onWheel(e) {
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

    if (items.length > 0) {
        loadShow();
    }

    const sections = document.querySelectorAll('main > section');

    sections.forEach((section, index) => {
        const arrow = section.querySelector('.arrow-wrapper');
        const nextSection = sections[index + 1];

        if (arrow && nextSection) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    const ratio = entry.intersectionRatio;
                    arrow.style.opacity = 1 - ratio;
                });
            }, {
                root: null,
                threshold: Array.from({ length: 101 }, (_, i) => i / 100)
            });
            observer.observe(nextSection);
        }
    });

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