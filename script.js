(function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const navClose = document.querySelector('.nav-close');
    const navLinks = document.querySelectorAll('.nav-list a');

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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxInfoTitle = document.querySelector('.lightbox-info h2');
    const lightboxInfoMeta = document.querySelector('.lightbox-info p:first-of-type');
    const lightboxInfoMedium = document.querySelector('.lightbox-info p:last-of-type');
    const lightboxClose = document.querySelector('.lightbox-close');
    const artworkLinks = document.querySelectorAll('.artwork-link');

    function openLightbox(imgSrc, title, year, medium) {
        lightboxImage.src = imgSrc;
        lightboxImage.alt = title;
        lightboxInfoTitle.textContent = title;
        lightboxInfoMeta.textContent = year;
        lightboxInfoMedium.textContent = medium;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    artworkLinks.forEach(link => {
        link.addEventListener('click', function() {
            const img = this.querySelector('img');
            const info = this.parentElement.querySelector('.artwork-info');
            const title = info.querySelector('h2').textContent;
            const year = info.querySelector('p:first-of-type').textContent;
            const medium = info.querySelector('p:last-of-type').textContent;
            openLightbox(img.src, title, year, medium);
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
})();
