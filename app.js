let items = document.querySelectorAll('.logos .item');
let isThrottled = false;
let active = 1;

function loadShow(){
    let stt = 0;
    items.forEach((item, idx) => {
        item.style.transition = 'transform 0.8s, filter 0.5s, opacity 0.5s';
    });

    // Item ativo centralizado
    items[active].style.transform = `translateX(-50%) scale(1)`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

    // Próximos à direita
    stt = 0;
    for(let i = active + 1; i < items.length; i++){
        stt++;
        items[i].style.transform = `translateX(calc(-50% + ${120*stt}px)) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }

    // Próximos à esquerda
    stt = 0;
    for(let i = active - 1; i >= 0; i--){
        stt++;
        items[i].style.transform = `translateX(calc(-50% - ${120*stt}px)) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}

function onWheel(e) {
    if (isThrottled) return;
    isThrottled = true;
    setTimeout(() => isThrottled = false, 400);

    if (e.deltaY > 0) {
        if (active < items.length - 1) {
            active++;
            loadShow();
        }
    } else if (e.deltaY < 0) {
        if (active > 0) {
            active--;
            loadShow();
        }
    }
}

// 1. Função para bloquear o scroll da página
function blockPageScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

const logos = document.querySelector('.logos');

// 2. Bloqueia e libera o scroll da página conforme mouse
logos.addEventListener('mouseenter', () => {
    window.addEventListener('wheel', blockPageScroll, { passive: false });
    window.addEventListener('touchmove', blockPageScroll, { passive: false });
});
logos.addEventListener('mouseleave', () => {
    window.removeEventListener('wheel', blockPageScroll, { passive: false });
    window.removeEventListener('touchmove', blockPageScroll, { passive: false });
});

// 3. Scroll do carrossel só funciona em .logos
logos.addEventListener('wheel', onWheel, { passive: false });

loadShow();