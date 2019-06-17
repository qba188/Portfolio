//NAVBAR

//hide nav open btn when the nav is open, adding/removing open classes to nav and content
var navOpenBtn = document.querySelector('.nav-open-btn');
var navCloseBtn = document.querySelector('.nav__close');
var nav = document.querySelector('.nav');
var pageContent = document.querySelectorAll('.page__content');
var pageContent = [...pageContent]
var navList = document.querySelector('.nav__list');
var page = document.querySelector('.page');

//open nav
navOpenBtn.addEventListener('click', function() {
  navOpenBtn.classList.add('js-hidden');
  
  nav.classList.add('js-opened');
  for (klass of pageContent) {
    klass.classList.add('js-opened');
  }
  
});

//close nav
navCloseBtn.addEventListener('click', function() {
  navOpenBtn.classList.remove('js-hidden');

  nav.classList.remove('js-opened');
  for (klass of pageContent) {
    klass.classList.remove('js-opened');
  }
  
});

//closing navigation if click outside it
page.addEventListener('click', function(e) {
  
  var evTarget = e.target;
  
  if((evTarget !== nav) && (nav.classList.contains('js-opened')) && (evTarget !== navOpenBtn) && (evTarget.parentNode !== navOpenBtn)) {
    console.log(navOpenBtn.firstChild);
    
    navOpenBtn.classList.remove('js-hidden');
  
    nav.classList.remove('js-opened');
  
    for (klass of pageContent) {
      klass.classList.remove('js-opened');
    }
  }
  
});


//adding default demo classes
nav.classList.add('nav--offcanvas-3');

for (klass of pageContent) {
  klass.classList.add('page__content--offcanvas-3');
}

//TOP PAGE ANIMATIONS//
const slidesItems = Array.from(document.querySelectorAll('.slides > .slide'));
			const imgs = {even:[],odd:[]};
			slidesItems.forEach((item) => {
				imgs.even.push(item.dataset.imageEven);
				imgs.odd.push(item.dataset.imageOdd);
			});

			const dil = new DualImageLayout(document.querySelector('.slices'), {
				images: {even: imgs.even[0],odd: imgs.odd[0]},
				slices: 179,
				orientation: 'horizontal'
			});

			imagesLoaded(document.body, { background: true }, () => {	
				animateGridItems();
            });

			let isAnimating = true;
			let currentSlide = 0;
			const slidesNavItems = Array.from(document.querySelectorAll('.slides__nav > .slides__nav-item'));
			const changeLocation = (ev,pos) => {
				ev.preventDefault();
				if ( pos === currentSlide || isAnimating ) {
					return false;
				}

				ev.target.classList.add('slides__nav-item--current');
				slidesNavItems[currentSlide].classList.remove('slides__nav-item--current');
				
				animateGridItems(currentSlide,pos);
				currentSlide = pos;
				dil.switchImages(imgs.even[currentSlide],imgs.odd[currentSlide],true);
			};
			slidesNavItems.forEach((item, pos) => item.addEventListener('click', (ev) => changeLocation(ev,pos)));

			const gridItemsLetters = [];
			slidesItems.forEach((item) => {
				Array.from(item.querySelectorAll('.grid__item')).forEach((gridItem) => charming(gridItem));
				gridItemsLetters.push(Array.from(item.querySelectorAll('span')));
			});

			const animateGridItems = (currentSlide = -1, pos = 0) => {
				isAnimating = true;
				const newLettersFn = () => {
					const promises = [];
					for (lettersGroup of gridItemsLetters[pos]) {
						promises.push(anime({
							targets: lettersGroup,
							duration: 10,
							easing: 'linear',
							delay: (t,i) => anime.random(200,1000),
							opacity: [0,1],
							before: () => lettersGroup.style.opacity = 0
						}).finished);
					}
					Promise.all(promises).then(()=> isAnimating = false);
				};

				if ( currentSlide !== -1 ) {
					const promises = [];
					for (lettersGroup of gridItemsLetters[currentSlide]) {
						promises.push(anime({
							targets: lettersGroup,
							duration: 10,
							easing: 'linear',
							delay: (t,i) => anime.random(200,1000),
							opacity: 0,
							before: () => lettersGroup.style.opacity = 1
						}).finished);
					}
					Promise.all(promises).then(()=> newLettersFn());
				}
				else {
					newLettersFn();
				}
			};

			const glitchText = document.querySelector('.date');
			charming(glitchText);
			Array.from(glitchText.querySelectorAll('span')).forEach(letter => {
				letter.style.opacity = 1;
				new GlitchFx(letter).glitch();
			});