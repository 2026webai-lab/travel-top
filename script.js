'use strict';

/* ============================================================
   共通ヘッダー・フッター・ドロワー・ローディング画面
   ・fetch は使わず DOM 構築のみで完結（file:// 環境でも動作）
   ============================================================ */

(function () {

    var NAV_ITEMS = [
        { label: 'TOP', href: './index.html' },
        { label: '台北', href: './taipei/index.html' },
        { label: '台中', href: './taichu/index.html' },
        { label: '台南', href: './tainan/index.html' },
        { label: '当サイトのポリシー', href: './policy.html' },
        { label: 'お問い合わせ', href: './contact.html' }
    ];

    function currentFileName() {
        var path = window.location.pathname;
        var last = path.substring(path.lastIndexOf('/') + 1);
        return last === '' ? 'index.html' : last;
    }

    function isCurrent(href) {
        var target = href.substring(href.lastIndexOf('/') + 1);
        return target === currentFileName();
    }

    /* ---------- ヘッダーを構築 ---------- */
    function buildHeader() {
        var mount = document.getElementById('topPage');
        if (!mount) return;

        var header = document.createElement('div');
        header.className = 'siteHeader';

        var logo = document.createElement('a');
        logo.className = 'siteLogo';
        logo.href = './index.html';
        logo.innerHTML = '台湾 <span>FORMOSA PASSPORT</span>';

        var nav = document.createElement('nav');
        nav.className = 'siteNav';
        nav.setAttribute('aria-label', 'サイト内メニュー');

        var navList = document.createElement('ul');
        navList.className = 'siteNavList';

        NAV_ITEMS.forEach(function (item) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.label;
            if (isCurrent(item.href)) {
                a.setAttribute('aria-current', 'page');
            }
            li.appendChild(a);
            navList.appendChild(li);
        });

        nav.appendChild(navList);

        var hamburger = document.createElement('button');
        hamburger.type = 'button';
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'メニューを開く');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'siteDrawer');
        hamburger.innerHTML =
            '<span class="hamburgerLine"></span>' +
            '<span class="hamburgerLine"></span>' +
            '<span class="hamburgerLine"></span>';

        header.appendChild(logo);
        header.appendChild(nav);
        header.appendChild(hamburger);
        mount.appendChild(header);

        var drawer = document.createElement('div');
        drawer.className = 'drawer';
        drawer.id = 'siteDrawer';

        var drawerNav = document.createElement('nav');
        drawerNav.setAttribute('aria-label', 'メニュー（開閉式）');

        var drawerList = document.createElement('ul');
        drawerList.className = 'drawerNavList';

        NAV_ITEMS.forEach(function (item) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.label;
            if (isCurrent(item.href)) {
                a.setAttribute('aria-current', 'page');
            }
            li.appendChild(a);
            drawerList.appendChild(li);
        });

        drawerNav.appendChild(drawerList);
        drawer.appendChild(drawerNav);
        document.body.appendChild(drawer);

        function openDrawer() {
            drawer.classList.add('isOpen');
            document.body.classList.add('drawerOpen');
            hamburger.setAttribute('aria-expanded', 'true');
            hamburger.setAttribute('aria-label', 'メニューを閉じる');
            var firstLink = drawerList.querySelector('a');
            if (firstLink) firstLink.focus();
        }

        function closeDrawer() {
            drawer.classList.remove('isOpen');
            document.body.classList.remove('drawerOpen');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'メニューを開く');
        }

        hamburger.addEventListener('click', function () {
            if (drawer.classList.contains('isOpen')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        drawerList.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') closeDrawer();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && drawer.classList.contains('isOpen')) {
                closeDrawer();
                hamburger.focus();
            }
        });

        window.addEventListener('scroll', function () {
            header.classList.toggle('isScrolled', window.scrollY > 8);
        }, { passive: true });
    }

    /* ---------- フッターを構築 ---------- */
    function buildFooter() {
        var mount = document.querySelector('footer');
        if (!mount) return;

        var inner = document.createElement('div');
        inner.className = 'siteFooterInner';

        var top = document.createElement('div');
        top.className = 'siteFooterTop';

        var logo = document.createElement('p');
        logo.className = 'siteFooterLogo';
        logo.textContent = '台湾 FORMOSA PASSPORT';

        var nav = document.createElement('nav');
        nav.className = 'siteFooterNav';
        nav.setAttribute('aria-label', 'フッターメニュー');

        NAV_ITEMS.forEach(function (item, i) {
            if (i > 0) nav.appendChild(document.createTextNode(''));
            var a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.label;
            nav.appendChild(a);
        });

        top.appendChild(logo);
        top.appendChild(nav);

        var meta = document.createElement('p');
        meta.className = 'siteFooterMeta';
        meta.textContent = '\u00A9 2026 FORMOSA PASSPORT ― 台湾観光案内';

        inner.appendChild(top);
        inner.appendChild(meta);
        mount.appendChild(inner);
    }

    /* ---------- ローディング画面を隠す ---------- */
    function hideLoading() {
        var loading = document.getElementById('loading');
        if (!loading) return;
        loading.classList.add('isHidden');
        window.setTimeout(function () {
            loading.style.display = 'none';
        }, 550);
    }

    function init() {
        buildHeader();
        buildFooter();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 画像読み込み完了を待つが、遅延時は最大1.2秒でフォールバック解除する
    window.addEventListener('load', hideLoading);
    window.setTimeout(hideLoading, 1200);

})();
