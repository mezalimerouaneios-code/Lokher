(function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const navClose = document.querySelector('.nav-close');
    const navLinks = document.querySelectorAll('.nav-list a');
    const worksToggle = document.querySelector('.nav-works-toggle');
    const worksSublist = document.querySelector('.nav-sublist');

    function openMenu() {
        menuToggle.setAttribute('aria-expanded', 'true');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuToggle.setAttribute('aria-expanded', 'false');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', openMenu);
    navClose.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    if (worksToggle && worksSublist) {
        worksToggle.addEventListener('click', () => {
            const isExpanded = worksToggle.getAttribute('aria-expanded') === 'true';
            worksToggle.setAttribute('aria-expanded', String(!isExpanded));
            worksSublist.hidden = isExpanded;
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxInfoTitle = document.querySelector('.lightbox-info h2');
    const lightboxInfoMedium = document.querySelector('.lightbox-medium');
    const lightboxInfoDimensions = document.querySelector('.lightbox-dimensions');
    const lightboxInfoYear = document.querySelector('.lightbox-year');
    const lightboxClose = document.querySelector('.lightbox-close');
    const artworkLinks = document.querySelectorAll('.artwork-link');

    function openLightbox(imgSrc, title, medium, dimensions, year) {
        lightboxImage.src = imgSrc;
        lightboxImage.alt = title;
        lightboxInfoTitle.textContent = title;
        lightboxInfoMedium.textContent = medium;
        lightboxInfoDimensions.textContent = dimensions;
        lightboxInfoYear.textContent = year;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = scrollbarWidth + 'px';
            document.querySelector('.header').style.paddingRight = scrollbarWidth + 'px';
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.querySelector('.header').style.paddingRight = '';
    }

    artworkLinks.forEach(link => {
        link.addEventListener('click', function() {
            const img = this.querySelector('img');
            const info = this.parentElement.querySelector('.artwork-info');
            const paragraphs = info.querySelectorAll('p');
            const title = info.querySelector('h2').textContent;
            const medium = paragraphs[0] ? paragraphs[0].textContent : '';
            const dimensions = paragraphs[1] ? paragraphs[1].textContent : '';
            const year = paragraphs[2] ? paragraphs[2].textContent : '';
            openLightbox(img.src, title, medium, dimensions, year);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    const langSwitch = document.getElementById('lang-switch');

    function applyTranslations(lang) {
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });
    }

    if (langSwitch) {
        const savedLang = localStorage.getItem('lang') || 'en';
        langSwitch.value = savedLang;
        applyTranslations(savedLang);

        langSwitch.addEventListener('change', function() {
            const selectedLang = this.value;
            localStorage.setItem('lang', selectedLang);
            applyTranslations(selectedLang);
        });
    }
})();
