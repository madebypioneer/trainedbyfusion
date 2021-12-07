import styles from './main.scss';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import SmoothScroll from 'smooth-scroll';
import flickity from 'flickity';
import flickityFade from 'flickity-fade';
import AOS from 'aos';
import MicroModal from 'micromodal';

AOS.init({
  once: true,
});

MicroModal.init({
	onShow: modal => openModal(),
  	onClose: modal => closeModal(),
	disableScroll: true
});

const bodyTag = document.body;
const headerContainer = document.getElementById("header-container");
const mobileMenuWithChildren = document.querySelectorAll('.mobile-menu-with-children');
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenuBox = document.getElementById("mobile-menu");
const mobileMenuItems = document.getElementById("mobile-items");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const siteCopyright = document.getElementById('copyright-date');

for (var i = 0; i < mobileMenuWithChildren.length; i++) {
  mobileMenuWithChildren[i].addEventListener('click', e => {
      e.target.querySelector('.mobile-menu-children').classList.toggle('h-0');
      e.target.querySelector('.mobile-menu-children').classList.toggle('invisible');
      e.target.querySelector('.mobile-menu-children').classList.toggle('pt-0');
      e.target.querySelector('.mobile-menu-children').classList.toggle('pt-8');
      e.target.classList.toggle('font-bold');
      e.target.querySelector('.mobile-children-icon').classList.toggle('mobile-icon-active');
  });
}

mobileMenuToggle.addEventListener('click', e => {
  mobileMenuBox.classList.toggle('mobile-menu-collaspe');
  mobileMenuBox.scrollTop = 0;
  mobileMenuItems.classList.toggle('mobile-items-collaspe');
  mobileMenuItems.scrollTop = 0;
  mobileMenuClose.classList.toggle('mobile-menu-close-collaspe');
  if (e.target.getAttribute('status') == "closed") {
    e.target.src = "https://inside.trainedbyfusion.com/wp-content/uploads/2021/06/close-menu.png";
    e.target.setAttribute('status', 'open');
  } else {
    e.target.src = "https://inside.trainedbyfusion.com/wp-content/uploads/2021/06/open-menu.png";
    e.target.setAttribute('status', 'closed');
  }
  if (document.body.style.overflow == "hidden") {
    enableBodyScroll('body');
  } else {
    disableBodyScroll('body');
  }
});

mobileMenuClose.addEventListener('click', e => {
  mobileMenuBox.classList.toggle('mobile-menu-collaspe');
  mobileMenuBox.scrollTop = 0;
  mobileMenuItems.classList.toggle('mobile-items-collaspe');
  mobileMenuItems.scrollTop = 0;
  mobileMenuClose.classList.toggle('mobile-menu-close-collaspe');
  mobileMenuToggle.src = "https://inside.trainedbyfusion.com/wp-content/uploads/2021/06/open-menu.png";
  mobileMenuToggle.setAttribute('status', 'closed');
  enableBodyScroll('body');
});

var today = new Date();
var yyyy = today.getFullYear();

today = yyyy;
siteCopyright.innerText = today;

// Lazy load script
// add lzy-bk to background-image and lzy-img to img tags

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImagesBk;    

  if ("IntersectionObserver" in window) {
    lazyloadImagesBk = document.querySelectorAll(".lzy-bk");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.classList.remove("lzy-bk");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImagesBk.forEach(function(image) {
      imageObserver.observe(image);
    });
  }
})

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImagesImg;    

  if ("IntersectionObserver" in window) {
    lazyloadImagesImg = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImagesImg.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImagesImg = document.querySelectorAll(".lazy");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImagesImg.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImagesImg.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})

// END Lazy load script

const observer = new IntersectionObserver( 
    ([e]) => {
      e.target.classList.toggle('isSticky', e.intersectionRatio < 1)
    },
    {threshold: [1]}
);

observer.observe(headerContainer);

const homeProgramSliderCheck = document.getElementById('home-program-slider');
const testimonialSliderCheck = document.getElementById('testimonial-slider');
const eventSliderCheck = document.getElementById('event-slider');
const valuesSliderCheck = document.getElementById('values-slider');
const successStoriesSliderCheck = document.getElementById('success-stories-slider');

if (homeProgramSliderCheck !== null) {
  let homeProgramSlider = new flickity( '#home-program-slider', {
    prevNextButtons: false,
    wrapAround: true,
    pageDots: true,
    cellAlign: "left"
  });
};

if (testimonialSliderCheck !== null) {
  let testimonialSlider = new flickity( '#testimonial-slider', {
    prevNextButtons: false,
    wrapAround: false,
    pageDots: false,
    freeScroll: false,
    draggable: false,
    fade: true,
    cellAlign: "left"
  });
  let prevTestButtons = document.querySelectorAll(".prev-test-button");
  for (var i = 0; i < prevTestButtons.length; i++) {
    let prevButton = prevTestButtons[i];
    prevButton.addEventListener( 'click', function() {
      testimonialSlider.previous( true );
    });
  }

  let nextTestButtons = document.querySelectorAll(".next-test-button");
  for (var i = 0; i < nextTestButtons.length; i++) {
    let nextButton = nextTestButtons[i];
    nextButton.addEventListener( 'click', function() {
      testimonialSlider.next( true );
    });
  }
};

if (eventSliderCheck !== null) {
  let eventSlider = new flickity( '#event-slider', {
    prevNextButtons: false,
    wrapAround: true,
    pageDots: true,
    cellAlign: "left"
  });
};

if (valuesSliderCheck !== null) {
  let valuesSlider = new flickity( '#values-slider', {
    prevNextButtons: false,
    wrapAround: false,
    pageDots: false,
    freeScroll: false,
    draggable: false,
    fade: true,
    cellAlign: "left"
  });
  let prevTestButtons = document.querySelectorAll(".prev-test-button");
  for (var i = 0; i < prevTestButtons.length; i++) {
    let prevButton = prevTestButtons[i];
    prevButton.addEventListener( 'click', function() {
      valuesSlider.previous( true );
    });
  }

  let nextTestButtons = document.querySelectorAll(".next-test-button");
  for (var i = 0; i < nextTestButtons.length; i++) {
    let nextButton = nextTestButtons[i];
    nextButton.addEventListener( 'click', function() {
      valuesSlider.next( true );
    });
  }
};

if (successStoriesSliderCheck !== null) {
  let successStoriesSlider = new flickity( '#success-stories-slider', {
    prevNextButtons: false,
    wrapAround: false,
    pageDots: false,
    freeScroll: false,
    draggable: false,
    fade: true,
    cellAlign: "left"
  });
  let prevTestButtons = document.querySelectorAll(".prev-test-button");
  for (var i = 0; i < prevTestButtons.length; i++) {
    let prevButton = prevTestButtons[i];
    prevButton.addEventListener( 'click', function() {
      successStoriesSlider.previous( true );
    });
  }

  let nextTestButtons = document.querySelectorAll(".next-test-button");
  for (var i = 0; i < nextTestButtons.length; i++) {
    let nextButton = nextTestButtons[i];
    nextButton.addEventListener( 'click', function() {
      successStoriesSlider.next( true );
    });
  }
};

let firstMenuItem = document.querySelector(".first-desktop-menu-item");
let headerDropdown = document.querySelector(".header-menu-dropdown");

firstMenuItem.addEventListener( 'mouseover', function(e) {
  headerDropdown.classList.add('show-dropdown');
});

headerDropdown.addEventListener( 'mouseover', function(e) {
  headerDropdown.classList.add('show-dropdown');
});

firstMenuItem.addEventListener( 'mouseout', function(e) {
  headerDropdown.classList.remove('show-dropdown');
});

headerDropdown.addEventListener( 'mouseout', function(e) {
  headerDropdown.classList.remove('show-dropdown');
});