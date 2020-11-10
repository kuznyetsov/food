function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    // Slider 

    const slideItems = document.querySelectorAll(container),
          slider = document.querySelector(slide),
          btnNext = document.querySelector(nextArrow),
          btnPrev = document.querySelector(prevArrow),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slideItems.length < 10) {
        total.textContent = `0${slideItems.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slideItems.length;
        current.textContent = slideIndex;
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    total.innerHTML = getZero(slideItems.length);

    slidesField.style.width = 100 * slideItems.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slideItems.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slideItems.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function activeDots() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function deleteNotDigits (str) {
        return +str.replace(/\D/g, '');
    }

    btnNext.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slideItems.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slideItems.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        current.innerHTML = getZero(slideIndex);
        activeDots();
    });

    btnPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slideItems.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slideItems.length;
        } else {
            slideIndex--;
        }
        current.innerHTML = getZero(slideIndex);
        activeDots();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            current.innerHTML = getZero(slideIndex);

            activeDots();
        });
    });
}

export default slider;