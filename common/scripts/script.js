'use strict'

// 必要な定数の宣言
const footer = document.querySelector('footer');
const header = document.querySelector('header');
const body = document.querySelector('body');
const navi = ['TOP', '台北', '台中', '台南', '当サイトのポリシー', 'お問い合わせ'];
const navi2 = ['TOPへもどる', '台北', '台中', '台南', '当サイトのポリシー', 'お問い合わせ'];
const gation = ['index.html', 'taipei/index.html', 'taichu/index.html', 'tainan/index.html']
const notGation = ['topPage', 'taipei', 'taichu', 'tainan']
const topPage = document.getElementById('topPage');
const taipeiPage = document.getElementById('taipei');
const taichuPage = document.getElementById('taichu');
const tainanPage = document.getElementById('tainan');
const headerInner = document.createElement('div');
const separateDiv = document.createElement('div');
const pageTop = document.createElement("button");
const buttonImage = document.createElement('img');
pageTop.id = ('pageTop');
header.appendChild(headerInner);
headerInner.classList.add('headerInner');
headerInner.appendChild(separateDiv);
separateDiv.classList.add('separateDiv');

// header,footerを作る関数
function menu() {
    if (header) {
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');
        header.appendChild(nav);
        nav.appendChild(ul);
        nav.classList.add('menu');
        if (taipeiPage) {
            nav.classList.add('taipeiMenu')
        } else if (taichuPage) {
            nav.classList.add('taichuMenu')
        } else if (tainanPage) {
            nav.classList.add('tainanMenu')
        }
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.remove(('moveDis'));
                nav.classList.add('move');
            } else {
                nav.classList.remove('move');
                nav.classList.add('moveDis');
            }
        });
        ul.classList.add('menuUl');
        const menuList = document.createElement('li');
        const picture = document.createElement('picture');
        const source = document.createElement('source');
        picture.appendChild(source);
        ul.appendChild(menuList);
        menuList.textContent = 'MENU';
        menuList.classList.add('menuList');

        //headerの背景画像を作成
        if (topPage) {
            const heroImage = document.createElement('img');
            header.appendChild(picture);
            picture.appendChild(source);
            picture.appendChild(heroImage);
            source.media = '(min-width:376px)';
            source.srcset = './images/heroImg2.jpg';
            heroImage.src = './images/heroImg.jpg';
        } else if (taipeiPage) {
            const heroImage = document.createElement('img');
            header.appendChild(picture);
            picture.appendChild(source);
            picture.appendChild(heroImage);
            source.media = '(min-width:376px)';
            source.srcset = '../common/images/heroTaipei2.jpg';
            heroImage.src = '../common/images/heroTaipei.jpg';
            const p = document.createElement('p')
            separateDiv.appendChild(p);
            p.classList.add('flavor')
            p.textContent = '台北市は台湾の中心地です。活気にあふれる街台北ではさまざまな建物、台北を生きる人の美しい風景を見ることができます。';
        } else if (taichuPage) {
            const heroImage = document.createElement('img');
            header.appendChild(picture);
            picture.appendChild(source);
            picture.appendChild(heroImage);
            source.media = '(min-width:376px)';
            source.srcset = '../common/images/heroTaichu2.jpg';
            heroImage.src = '../common/images/heroTaichu.jpg';
            const p = document.createElement('p')
            separateDiv.appendChild(p);
            p.classList.add('flavor')
            p.textContent = '台湾で2番目の大都市を誇る台中市。台中市は台湾中部の台中盆地にあり、いくつもの河川が台中市の中心地を貫いています。'
        } else if (tainanPage) {
            const heroImage = document.createElement('img');
            header.appendChild(picture);
            picture.appendChild(source);
            picture.appendChild(heroImage);
            source.media = '(min-width:376px)';
            source.srcset = '../common/images/heroTainan2.jpg';
            heroImage.src = '../common/images/heroTainan.jpg';
            const p = document.createElement('p')
            separateDiv.appendChild(p);
            p.classList.add('flavor')
            p.textContent = '台湾の古都「台南」台南はお寺などの史跡巡りや、リノベエリアの散策が楽しめる、新旧の魅力が交わる街です。'
        }

        const logoImage = document.createElement('img');
        separateDiv.before(logoImage);

        //headerのロゴ画像を作成
        if (topPage) {
            logoImage.src = './common/images/logoTitle.png';
            logoImage.classList.add('logoTitleTaiwan');
        } else if (taipeiPage) {
            logoImage.src = '../common/images/logoTitle.png';
            logoImage.classList.add('logoSubTitleTaipei');
            const logoImage3 = document.createElement('img');
            separateDiv.before(logoImage3);
            logoImage3.src = '../common/images/taipeiLogo.png';
            logoImage3.classList.add('logoTitleTaipei');
        } else if (taichuPage) {
            logoImage.src = '../common/images/logoTitle.png';
            logoImage.classList.add('logoSubTitleTaichung');
            const logoImage3 = document.createElement('img');
            separateDiv.before(logoImage3);
            logoImage3.src = '../common/images/taichuLogo.png';
            logoImage3.classList.add('logoTitleTaichung');
        } else if (tainanPage) {
            logoImage.src = '../common/images/logoTitle.png';
            logoImage.classList.add('logoSubTitleTainan');
            const logoImage3 = document.createElement('img');
            separateDiv.before(logoImage3);
            logoImage3.src = '../common/images/tainanLogo.png';
            logoImage3.classList.add('logoTitleTainan');
        }

        const logoImage2 = logoImage.cloneNode(true);
        ul.before(logoImage2);
        logoImage2.classList.add('logoSubTitleSettings');
        logoImage2.classList.toggle('logoTitleTaiwan');
        if (taipeiPage) {
            logoImage2.classList.toggle('logoSubTitleTaipei')
            logoImage2.classList.toggle('logoTitleTaiwan');
        } else if (taichuPage) {
            logoImage2.classList.toggle('logoSubTitleTaichung')
            logoImage2.classList.toggle('logoTitleTaiwan');
        } else if (tainanPage) {
            logoImage2.classList.toggle('logoSubTitleTainan')
            logoImage2.classList.toggle('logoTitleTaiwan');
        }

        //宣言した配列から他ページへのリンクを作成
        navi.forEach(function (menu, index) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            ul.appendChild(li);
            li.classList.add('menuLi' + index);
            li.appendChild(a);
            a.textContent = menu;
            if (index === 0 && topPage) {
                a.href = '#' + notGation[index];
            } else if (index === 1 && taipeiPage) {
                a.href = '#' + notGation[index];
            } else if (index === 2 && taichuPage) {
                a.href = '#' + notGation[index];
            } else if (index === 3 && tainanPage) {
                a.href = '#' + notGation[index];
            } else if (topPage) {
                a.href = './' + gation[index];
            } else {
                a.href = '../' + gation[index];
            }
        });

        //ドロワーメニューのデザイン
        const button = document.createElement('button');
        button.classList.add('hamburger');
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            button.append(span);
            span.classList.add('bar' + i);
        }

        //ボタンをクリックした際にCSSを適用
        header.append(button);
        button.onclick = function () {
            nav.classList.toggle('Menuopen');
            button.classList.toggle('active');
            nav.classList.add('animate');
            pageTop.classList.toggle('hide');

            window.addEventListener('resize', () => {
                nav.classList.remove('animate');
            });
        };

        //SNSのロゴを作成
        const imageDiv = document.createElement('div');
        separateDiv.appendChild(imageDiv);
        const logoFacebook = document.createElement('img');
        imageDiv.appendChild(logoFacebook);
        if (taichuPage) {
            imageDiv.classList.add('imageDivDifference');
        } else {
            imageDiv.classList.add('imageDiv')
        }

        logoFacebook.classList.add('logoFacebook');
        const logoInstagram = document.createElement('img');
        imageDiv.appendChild(logoInstagram);
        logoInstagram.classList.add('logoInstagram');

        const logoX = document.createElement('img');
        imageDiv.appendChild(logoX);
        logoX.classList.add('logoX');

        if (topPage) {
            logoX.src = './common/images/logoX.svg';
            logoInstagram.src = './common/images/logoInstagram.svg';
            logoFacebook.src = './common/images/logoFacebook.svg';
        } else {
            logoX.src = '../common/images/logoX.svg';
            logoInstagram.src = '../common/images/logoInstagram.svg';
            logoFacebook.src = '../common/images/logoFacebook.svg';
        }
    }

    // 戻るボタン

    if (topPage) {
        buttonImage.src = './common/images/top.png'
    } else {
        buttonImage.src = '../common/images/top.png'
    }

    body.appendChild(pageTop);
    pageTop.appendChild(buttonImage);

    if (pageTop) {

        // スクロールしたら表示
        window.addEventListener("scroll", () => {

            if (window.scrollY > 300) {
                pageTop.classList.add("show");
            } else {
                pageTop.classList.remove("show");
            }

        });

        // ボタンを押したら一番上へ
        pageTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }

    if (footer) {
        const footerInner = document.createElement('div');
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');
        const nationalImgae = document.createElement('img');
        footer.appendChild(footerInner);
        footerInner.classList.add('footerInner');
        footerInner.appendChild(nationalImgae);

        const flexDiv = document.createElement('div');
        footerInner.appendChild(flexDiv);
        flexDiv.classList.add('footerFlexDiv');

        if (topPage) {
            nationalImgae.src = './common/images/nationalFlag.png';
        } else {
            nationalImgae.src = '../common/images/nationalFlag.png';
        }

        nationalImgae.classList.add('nationalFlag');
        flexDiv.appendChild(nav);
        nav.appendChild(ul);
        nav.classList.add('menuFooter');

        //footerのリンクを作成
        navi2.forEach(function (menu, index) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            ul.appendChild(li);
            li.classList.add('menuLi');
            li.appendChild(a);
            a.textContent = menu;
            if (index === 0 && topPage) {
                a.href = '#' + notGation[index];
            } else if (index === 1 && taipeiPage) {
                a.href = '#' + notGation[index];
            } else if (index === 2 && taichuPage) {
                a.href = '#' + notGation[index];
            } else if (index === 3 && tainanPage) {
                a.href = '#' + notGation[index];
            } else if (topPage) {
                a.href = './' + gation[index];
            } else {
                a.href = '../' + gation[index];
            }
            li.classList.add('listItem' + [index]);
        })

        //SNSのロゴを複数指定
        const footerSubTitle = document.createElement('img');
        flexDiv.appendChild(footerSubTitle);
        footerSubTitle.classList.add('footerSubTitle');
        if (topPage) {
            footerSubTitle.src = './common/images/logoTitle.png';
        } else {
            footerSubTitle.src = '../common/images/logoTitle.png';
        }
        const imageDiv2 = document.createElement('div');
        imageDiv2.classList.add('imageDiv2');
        flexDiv.appendChild(imageDiv2);
        const hr = document.createElement('hr');
        footerInner.after(hr);
        hr.classList.add('footerHr');

        const logoFacebook = document.createElement('img');
        imageDiv2.appendChild(logoFacebook);
        logoFacebook.classList.add('logoFacebook');

        const logoInstagram = document.createElement('img');
        imageDiv2.appendChild(logoInstagram);
        logoInstagram.classList.add('logoInstagram');

        const logoX = document.createElement('img');
        imageDiv2.appendChild(logoX);
        logoX.classList.add('logoX');


        if (topPage) {
            logoInstagram.src = './common/images/logoInstagram.svg';
            logoFacebook.src = './common/images/logoFacebook.svg';
            logoX.src = './common/images/logoX.svg';

        } else {
            logoInstagram.src = '../common/images/logoInstagram.svg';
            logoFacebook.src = '../common/images/logoFacebook.svg';
            logoX.src = '../common/images/logoX.svg';
        }

        const small = document.createElement('small');
        hr.after(small);
        small.textContent = 'Copyright (c) 2023 TAIWAN.traveler.cc';
    }
};

menu();

window.addEventListener("load", () => {

    const loading = document.getElementById("loading");

    setTimeout(() => {

        loading.style.opacity = "0";

        setTimeout(() => {
            loading.style.display = "none";
        }, 800);

    }, 2000);

});

fabicon();

function fabicon() {
    const link = document.createElement('link');
    const title = document.querySelector('title');

    title.before(link);

    if (topPage) {
        link.href = './common/images/fabicon.png';
    } else {
        link.href = '../common/images/fabicon.png';
    }

    link.rel = 'icon';
    link.type = 'image/png';
}

document.body.classList.add("loading");

window.addEventListener("load", () => {

    const loading = document.getElementById("loading");

    setTimeout(() => {

        loading.style.opacity = "0";

        setTimeout(() => {
            loading.style.display = "none";
            document.body.classList.remove("loading");
        }, 800);

    }, 2000);

});