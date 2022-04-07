// make mobile navigation work
const htmlElement = document.querySelector("html")
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEL = document.querySelector('.header');
const logoEl = document.querySelector('.logo-header');
const questionListEl = document.querySelectorAll('.question-list');
const menuLinksEl = document.querySelectorAll('.menu-links');
const logoFooterEl = document.querySelector('.logo-footer');
const contactButtonEl = document.querySelector('.contact-button');
const menuLinksContent = [
    {
        image: "illustration-features-tab-1.svg",
        heading: "Bookmark in one click",
        description: "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites."
    },
    {
        image: "illustration-features-tab-2.svg",
        heading: "Intelligent search",
        description: "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks."
    },
    {
        image: "illustration-features-tab-3.svg",
        heading: "Share your bookmarks",
        description: "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button."
    }
];

btnNavEl.addEventListener('click', function () {
    headerEL.classList.toggle('nav-open');
    
    if (headerEL.classList.contains('nav-open')) {
        setTimeout(() => {
            logoEl.src = "./images/logo-bookmark-white-menu.svg";
        }, 500);

        htmlElement.style.overflowY = "hidden";
    } else {
        logoEl.src = "./images/logo-bookmark.svg";
        htmlElement.style.overflowY = null;
    }
});

questionListEl.forEach(function (element, index) {
    const currentList = element;
    const currentListIndex = index;

    currentList.addEventListener('click', function (e) {
        const arrayQuestionElement = Array.from(questionListEl);
        
        arrayQuestionElement.filter(function (value, index) {
            return currentListIndex == index ? value.classList.add('opened') : value.classList.remove('opened');
        });
    });
});

menuLinksEl.forEach(function (element, index) {
    const currentList = element;
    const currentListIndex = index;

    currentList.addEventListener('click', function (e) {
        const arrayMenuElement = Array.from(menuLinksEl);

        arrayMenuElement.filter(function (value, index) {
            return currentListIndex == index ? value.classList.add('selected-page') : value.classList.remove('selected-page');
        });

        const currentMenu = menuLinksContent[currentListIndex];
        const featureTabImg = document.querySelector('.features-tab-img');
        const featureTabHeading = document.querySelector('.detail-text-box .heading-secondary');
        const featureTabDesc = document.querySelector('.detail-text-box .text-description');

        featureTabImg.src = `./images/${currentMenu.image}`;
        featureTabHeading.innerHTML = currentMenu.heading;
        featureTabDesc.innerHTML = currentMenu.description;
    });
});

logoFooterEl.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

contactButtonEl.addEventListener('click', function () {
    const contactForm = document.querySelector('form');
    const inputForm  = document.querySelector('.input-form');
    const emailInput = document.querySelector('[name="email"]').value;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (emailInput.length == 0 || emailInput.indexOf("@") == -1) {
            inputForm.classList.add("error");
        } else {
            const formData = new FormData(contactForm);

            fetch(contactForm.getAttribute('action'), {
                method: 'POST',
                headers: {
                    'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: new URLSearchParams(formData).toString()
            })
            .then(function (res) {
                if (res) {
                    alert('Thanks for submitting');
                    location.reload();
                }
            });
        }
    });
});