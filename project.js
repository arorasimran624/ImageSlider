//Access HTML Elements
const carouselRow = document.querySelector('.slides-row');
const carouselSlides = document.getElementsByClassName('slide');
const dots = document.getElementsByClassName('dot');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

//Declare variables

let index = 1;
var width;

function slideWidth() {
    width = carouselSlides[0].clientWidth;

}
slideWidth();
window.addEventListener('resize', slideWidth)
carouselRow.style.transform = 'translateX(' + (-width * index) + 'px)';

//go to next slide
nextBtn.addEventListener('click', nextSlide);
function nextSlide() {
    if (index >= carouselSlides.length - 1) { return };
    carouselRow.style.transition = 'transform 0.4s ease-out';
    index++;
    carouselRow.style.transform = 'translateX(' + (-width * index) + 'px)';
    dotsLabel();
}
//go to previous slide
prevBtn.addEventListener('click', prevSlide);
function prevSlide() {
    if (index <= 0) { return };
    carouselRow.style.transition = 'transform 0.4s ease-out';
    index--;
    carouselRow.style.transform = 'translateX(' + (-width * index) + 'px)';
    dotsLabel();
}

//return to the first slide when reaches last slide

carouselRow.addEventListener('transitionend', function () {
    if (carouselSlides[index].id === 'firstImageDuplicate') {
        carouselRow.style.transition = 'none';
        index = carouselSlides.length - index;
        carouselRow.style.transform = 'translateX(' + (-width * index) + 'px)';
        dotsLabel();
    }
    if (carouselSlides[index].id === 'lastImageDuplicate') {
        carouselRow.style.transition = 'none';
        index = carouselSlides.length - 2;
        carouselRow.style.transform = 'translateX(' + (-width * index) + 'px)';
        dotsLabel();
    }
})

//Auto sliding
function autoSlide() {
    deleteInterval = setInterval(timer, 2000);
    function timer() {
        nextSlide();
    }
}
autoSlide();
//Stop auto-sliding when mouse in over
const mainContainer = document.querySelector('.container');
mainContainer.addEventListener('mouseover', function () {
    clearInterval(deleteInterval);
});

//resume sliding when mouse is out
mainContainer.addEventListener('mouseout', autoSlide);
function dotsLabel() {
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '')
    }
    dots[index - 1].className += ' active';
}