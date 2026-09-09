'use strict'

const gallerySection = document.querySelector('.gallerySection');
const sliderContainer = document.createElement('div');
const slideImageContainer = document.createElement('div');
const slideImage = ['./images/slide1.jpg', './images/slide2.jpg', './images/slide3.jpg', './images/slide4.jpg', './images/slide5.jpg'];
const slideCount = slideImage.length;
const autoPlayDelay = 3000;

let dotsContainer = [];
let imageAll = [];
let container = [];
let current = 3;
let isTransitioning = false;
let autoPlayTimer = null;
let isDragging = false;
let dragStartX = 0;
let dragBaseMoveX = 0;

gallerySection.appendChild(sliderContainer);
sliderContainer.appendChild(slideImageContainer);
sliderContainer.classList.add('sliderContainer')
slideImageContainer.classList.add('slideImageContainer');

function createSlider() {
    slideImage.forEach(function (image, index) {
        const imageContainer = document.createElement('div');
        const innerImage = document.createElement('img');

        slideImageContainer.appendChild(imageContainer);
        imageContainer.appendChild(innerImage);

        imageContainer.classList.add('slideContainer' + index);
        innerImage.src = image;
        innerImage.draggable = false;
        imageAll.push(innerImage);
        container.push(imageContainer);

    })
}

function cloneFunction() {
    const firstClone = imageAll[4].cloneNode(true);
    const secondClone = imageAll[3].cloneNode(true);
    const thirdClone = imageAll[2].cloneNode(true);
    const lastClone = imageAll[0].cloneNode(true);
    const semiLastClone = imageAll[1].cloneNode(true);
    const finalClone = imageAll[2].cloneNode(true);
    let contain

    let i = 0;

    while (i < 6) {
        const imageContainer = document.createElement('div');
        if (i === 0) {
            container[0].before(imageContainer);
            imageContainer.appendChild(firstClone);
            contain = imageContainer;
        } else if (i === 1) {
            contain.before(imageContainer);
            imageContainer.appendChild(secondClone);
            contain = imageContainer;
        } else if (i === 2) {
            contain.before(imageContainer);
            imageContainer.appendChild(thirdClone);
        } else if (i === 3) {
            container[4].after(imageContainer);
            imageContainer.appendChild(lastClone);
            contain = imageContainer;
        } else if (i === 4) {
            contain.after(imageContainer);
            imageContainer.appendChild(semiLastClone);
            contain = imageContainer;
        } else if (i === 5) {
            contain.after(imageContainer);
            imageContainer.appendChild(finalClone);
        }

        i++;
    }

}

function createDot() {
    const dots = document.createElement('div');
    const prev = document.createElement('img');
    const next = document.createElement('img');

    gallerySection.appendChild(dots);
    dots.classList.add('dots');

    let i = 0;

    while (i < 5) {

        let dotIndex = i;

        if (i === 0) {
            prev.src = './common/images/top.png';
            prev.classList.add('prev');
            dots.appendChild(prev);

            prev.addEventListener('click', function () {
                prevSlide();
                resetAutoplay();
            });
        }

        const dot = document.createElement('span');
        dots.appendChild(dot);
        dot.classList.add('dot');
        dotsContainer.push(dot);

        dot.addEventListener('click', function () {

            current = dotIndex + 3;

            moveSlide(current);

            updateDots(dotsContainer);

            resetAutoplay();

        });

        if (i === 4) {
            next.src = './common/images/top.png';
            next.classList.add('next');
            dots.appendChild(next);

            next.addEventListener('click', function () {
                nextSlide();
                resetAutoplay();
            });
        }
        i++;
    }

    return dotsContainer;
}

function moveSlide(index, animate = true) {

    if (!animate) {
        slideImageContainer.style.transition = 'none';
        slideImageContainer.offsetHeight;
    } else {
        slideImageContainer.style.transition = '';
    }


    const moveX =
        index * getSlideStep() - getCenterOffset();


    slideImageContainer.style.transform =
        'translateX(-' + moveX + 'px)';
}

function updateDots(dotsContainer) {
    const displayIndex = (((current - 3) % slideCount) + slideCount) % slideCount;
    dotsContainer.forEach(function (dot, index) {
        dot.classList.toggle('dotActive', index === displayIndex);
    })
}

function getSlideStep() {
    const gap = parseFloat(getComputedStyle(slideImageContainer).columnGap) || 20;
    const slideWidth = imageAll[0].offsetWidth;

    return slideWidth + gap;
}

function nextSlide() {
    if (isTransitioning) return;

    isTransitioning = true;

    current++;

    moveSlide(current);
    updateDots(dotsContainer);

}

function autoPlayNextSlide() {
    if (isDragging) return;
    nextSlide();
}

function startAutoplay() {
    stopAutoplay();
    autoPlayTimer = setInterval(autoPlayNextSlide, autoPlayDelay);
}

function stopAutoplay() {
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
}

function resetAutoplay() {
    startAutoplay();
}

let transitionWatchdog = null;

function armTransitionWatchdog() {
    clearTransitionWatchdog();
    // CSSの transition: transform .4s ease より少し長めに取ってある
    transitionWatchdog = setTimeout(handleTransitionEnd, 600);
}

function clearTransitionWatchdog() {
    if (transitionWatchdog) {
        clearTimeout(transitionWatchdog);
        transitionWatchdog = null;
    }
}

function handleTransitionEnd() {
    clearTransitionWatchdog();

    isTransitioning = false;


    if (current === 8) {

        current = 3;
        moveSlide(current, false);

    }


    if (current === 2) {

        current = 7;
        moveSlide(current, false);

    }

}

slideImageContainer.addEventListener('transitionend', function () {

    isTransitioning = false;


    if (current === 8) {

        current = 3;
        moveSlide(current, false);

    }


    if (current === 2) {

        current = 7;
        moveSlide(current, false);

    }

});

window.addEventListener('resize', function () {
    moveSlide(current, false);
});

function prevSlide() {
    if (isTransitioning) return;

    isTransitioning = true;

    current--;

    moveSlide(current);
    updateDots(dotsContainer);

}

function dragStart(clientX) {
    if (isTransitioning) return;

    isDragging = true;
    dragStartX = clientX;
    dragBaseMoveX = current * getSlideStep() - getCenterOffset();

    slideImageContainer.style.transition = 'none';
    sliderContainer.classList.add('dragging');

    stopAutoplay();
}

function dragMove(clientX) {
    if (!isDragging) return;

    const step = getSlideStep();
    let deltaX = clientX - dragStartX;

    const limit = step * 1.2;
    if (deltaX > limit) deltaX = limit;
    if (deltaX < -limit) deltaX = -limit;

    const moveX = dragBaseMoveX - deltaX;
    slideImageContainer.style.transform = 'translateX(-' + moveX + 'px)';
}

function dragEnd(clientX) {
    if (!isDragging) return;

    isDragging = false;
    sliderContainer.classList.remove('dragging');

    const deltaX = clientX - dragStartX;
    const threshold = getSlideStep() / 4;

    if (deltaX <= -threshold) {
        current++;
    } else if (deltaX >= threshold) {
        current--;
    }

    isTransitioning = true;
    slideImageContainer.style.transition = '';
    moveSlide(current);
    updateDots(dotsContainer);

    resetAutoplay();
}

function getCenterOffset() {
    const sliderWidth = sliderContainer.clientWidth;
    const slideWidth = imageAll[0].offsetWidth;

    return (sliderWidth - slideWidth) / 2;
}

createSlider();
cloneFunction();

sliderContainer.addEventListener('pointerdown', function (e) {
    sliderContainer.setPointerCapture(e.pointerId);
    dragStart(e.clientX);
});

sliderContainer.addEventListener('pointermove', function (e) {
    dragMove(e.clientX);
});

sliderContainer.addEventListener('pointerup', function (e) {
    dragEnd(e.clientX);
});

sliderContainer.addEventListener('pointercancel', function (e) {
    dragEnd(e.clientX);
});

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        stopAutoplay();
    } else if (!isDragging) {
        startAutoplay();
    }
});

window.addEventListener('load', function () {

    dotsContainer = createDot();

    moveSlide(current);

    updateDots(dotsContainer);

    startAutoplay();

})
