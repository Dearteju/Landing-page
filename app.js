/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
var nav = document.querySelector('.navbar__menu');
var position = 0;


/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
window.onload = function() {
    loadNavigationItems();
    initializeScrollBehaviour();
};

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function scrollSmoothly(event) {
    var element = event.target;
    var section_id = element.getAttribute('data-section-id');
    document.querySelector('#' + section_id).scrollIntoView({
        behavior: 'smooth'
    });

    var previousActiveElement = document.getElementsByClassName('your-active-class');
    previousActiveElement[0].className = '';

    var current_active_section = document.getElementById(section_id);
    current_active_section.className = 'your-active-class';
}

function loadNavigationItems() {
    var sections = document.getElementsByTagName('section');
    var navbar__list = document.getElementById('navbar__list');
    for (var i = 0; i < sections.length; ++i) {
        var section_id = sections[i].getAttribute('id');
        var li = document.createElement('li');
        var span = document.createElement('span');
        span.setAttribute('data-section-id', section_id);
        span.onclick = scrollSmoothly;
        span.innerHTML = sections[i].getAttribute('data-nav');
        li.style.color = 'grey';
        li.appendChild(span);
        navbar__list.appendChild(li);
    }
}
// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 

// Scroll to section on link click
function initializeScrollBehaviour() {
    var mybutton = document.getElementById("myBtn");

    window.onscroll = function() { scrollFunction() };

    function scrollFunction() {
        setActiveClass();
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
}

function getSectionDetails() {
    var sections = document.getElementsByTagName('section');
    var each_section_height = {};
    for (var i = 0; i < sections.length; ++i) {
        var section_id = sections[i].getAttribute('id');
        var section_height = document.getElementById(section_id).offsetTop;
        each_section_height[section_id] = section_height;
    }
    return each_section_height;
}

function setActiveClass() {
    var sections_and_heights = getSectionDetails();
    for (var key in sections_and_heights) {
        var low = sections_and_heights[key] - 50;
        var high = sections_and_heights[key] + 50;

        if (low <= document.documentElement.scrollTop && document.documentElement.scrollTop <= high) {
            var previousActiveElement = document.getElementsByClassName('your-active-class');
            previousActiveElement[0].className = '';

            var current_active_section = document.getElementById(key);
            current_active_section.className = 'your-active-class';
        }
    }
}