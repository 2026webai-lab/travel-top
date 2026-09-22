'use strict';

/* ============ 表紙: スクロールキュー ============ */
(function initScrollCue() {
    const cue = document.querySelector('[data-scroll-next]');
    if (!cue) return;

    cue.addEventListener('click', function () {
        const next = document.querySelector('.mrzStrip');
        if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
})();

/* ============ 写真ページ: フィルムストリップのドラッグ／矢印操作 ============ */
(function initFilmDeck() {
    const viewport = document.querySelector('.filmViewport');
    const track = document.getElementById('filmTrack');
    const prevBtn = document.querySelector('.filmArrowPrev');
    const nextBtn = document.querySelector('.filmArrowNext');
    if (!viewport || !track) return;

    let offset = 0;
    let isDragging = false;
    let startX = 0;
    let baseOffset = 0;

    function getStep() {
        const frame = track.querySelector('.filmFrame');
        if (!frame) return 0;
        const style = getComputedStyle(track);
        const gap = parseFloat(style.columnGap) || 0;
        return frame.getBoundingClientRect().width + gap;
    }

    function getMaxOffset() {
        return Math.max(0, track.scrollWidth - viewport.clientWidth);
    }

    function applyOffset() {
        const max = getMaxOffset();
        offset = Math.min(0, Math.max(-max, offset));
        track.style.transform = 'translateX(' + offset + 'px)';
    }

    function moveByStep(direction) {
        offset -= direction * getStep();
        applyOffset();
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { moveByStep(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { moveByStep(1); });

    viewport.addEventListener('pointerdown', function (e) {
        isDragging = true;
        startX = e.clientX;
        baseOffset = offset;
        viewport.classList.add('dragging');
        viewport.setPointerCapture(e.pointerId);
        track.style.transition = 'none';
    });

    viewport.addEventListener('pointermove', function (e) {
        if (!isDragging) return;
        offset = baseOffset + (e.clientX - startX);
        applyOffset();
    });

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        viewport.classList.remove('dragging');
        track.style.transition = '';
    }

    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('pointerleave', endDrag);

    window.addEventListener('resize', applyOffset);
})();

/* ============ 査証区分: スクロールで一度だけ現れるスタンプ演出 ============ */
(function initRegionReveal() {
    const stamps = document.querySelectorAll('.regionStamp');
    if (!stamps.length) return;

    if (!('IntersectionObserver' in window)) {
        stamps.forEach(function (el) { el.classList.add('isVisible'); });
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('isVisible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    stamps.forEach(function (el) { observer.observe(el); });
})();
