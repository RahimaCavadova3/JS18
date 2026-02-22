/**
 * Template Name: Dewi
 * Template URL: https://bootstrapmade.com/dewi-free-multi-purpose-html-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim(),
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        },
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false,
        );
      });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

// portfoliocards
let portfoliocards = document.getElementById("portfoliocards");

class Portfolio {
  constructor(img1, title1, text1) {
    this.img1 = img1;
    this.title1 = title1;
    this.text1 = text1;
  }
  showPortfolio() {
    return `
        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
              <div class="portfolio-content h-100">
                <img src="${this.img1}" class="img-fluid" alt="">
                <div class="portfolio-info">
                  <h4>${this.title1}</h4>
                  <p>${this.text1}</p>
                  <a href="assets/img/portfolio/product-1.jpg" title="Product 1" data-gallery="portfolio-gallery-product" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                  <a href="portfolio-details.html" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
                </div>
              </div>
            </div>
        
          `;
  }
}

let AllPortfolio = [
  new Portfolio(
    "assets/img/portfolio/app-1.jpg",
    "App 1",
    "Lorem ipsum, dolor sit amet consectetur",
  ),
  new Portfolio(
    "assets/img/portfolio/product-1.jpg",
    "Product 1",
    "Lorem ipsum, dolor sit amet consectetur",
  ),
  new Portfolio(
    "assets/img/portfolio/branding-1.jpg",
    "Branding 1",
    "Lorem ipsum, dolor sit amet consectetur",
  ),
  new Portfolio(
    "assets/img/portfolio/books-1.jpg",
    "Books 1",
    "Lorem ipsum, dolor sit amet consectetur",
  ),
  new Portfolio(
    "assets/img/portfolio/app-2.jpg",
    "App 2",
    "Lorem ipsum, dolor sit amet consectetur",
  ),
  new Portfolio(
    "assets/img/portfolio/product-2.jpg",
    "Product 2",
    "Lorem ipsum, dolor sit amet consectetur",
  ),
  new Portfolio(
    "assets/img/portfolio/branding-2.jpg",
    "Branding 2",
    "Lorem ipsum, dolor sit amet consectetur",
  ),
  new Portfolio(
    "assets/img/portfolio/books-2.jpg",
    "Books 2",
    "Lorem ipsum, dolor sit amet consectetur",
  ),
  new Portfolio(
    "assets/img/portfolio/app-3.jpg",
    "App 3",
    "Lorem ipsum, dolor sit amet consectetur",
  ),
  new Portfolio(
    "assets/img/portfolio/product-3.jpg",
    "Product 3",
    "Lorem ipsum, dolor sit amet consectetur",
  ),
  new Portfolio(
    "assets/img/portfolio/branding-3.jpg",
    "Branding 3",
    "Lorem ipsum, dolor sit amet consectetur",
  ),
  new Portfolio(
    "assets/img/portfolio/books-3.jpg",
    "Books 3",
    "Lorem ipsum, dolor sit amet consectetur",
  ),
];

for (let i = 0; i < AllPortfolio.length; i++) {
  portfoliocards.innerHTML += AllPortfolio[i].showPortfolio();
}

// servicescards
let servicescards = document.getElementById("servicescards");

class Services {
  constructor(img, icon, title, text) {
    this.img = img;
    this.icon = icon;
    this.title = title;
    this.text = text;
  }
  showServices() {
    return `
       <div class="col-xl-4 col-md-6" data-aos="zoom-in" data-aos-delay="200">
            <div class="service-item">
              <div class="img">
                <img src="${this.img}" alt="">
              </div>
              <div class="details position-relative">
                <div class="icon">
                  <i class="${this.icon}"></i>
                </div>
                <a href="service-details.html" class="stretched-link">
                  <h3>${this.title}</h3>
                </a>
                <p>${this.text}</p>
              </div>
            </div>
          </div>
        
          `;
  }
}

let AllServices = [
  new Services(
    "assets/img/services-1.jpg",
    "bi bi-activity",
    "Nesciunt Mete",
    "Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis."
  ),
  new Services(
    "assets/img/services-2.jpg",
    "bi bi-broadcast",
    "Eosle Commodi",
    "Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem."
  ),
  new Services(
    "assets/img/services-3.jpg",
    "bi bi-easel",
    "Ledo Markt",
    "Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti."
  ),
]

for (let i = 0; i < AllServices.length; i++) {
  servicescards.innerHTML += AllServices[i].showServices();
}

