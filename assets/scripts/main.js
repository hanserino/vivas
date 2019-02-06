/**
 * Touch device test
 */

let isTouchDevice = function () {
    return (
        !!(typeof window !== 'undefined' &&
            ('ontouchstart' in window ||
                (window.DocumentTouch &&
                    typeof document !== 'undefined' &&
                    document instanceof window.DocumentTouch))) ||
        !!(typeof navigator !== 'undefined' &&
            (navigator.maxTouchPoints || navigator.msMaxTouchPoints))
    );
};


function init() {
    document.body.setAttribute("data-touch", isTouchDevice());
    document.getElementById('year').appendChild(document.createTextNode(new Date().getFullYear()));

    const toggler = document.getElementsByClassName("toggle");

    document.querySelector("button > span").addEventListener("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
      });
      
    
    for (var i = 0; i < toggler.length; i++) {
        console.log(toggler[i]);

        toggler[i].addEventListener('click', function(e){
            e.target.parentNode.parentNode.classList.toggle('active');
        }, false);
    }

}



/**
 * Wait for document ready to fire dom dependent stuf
 */

window.addEventListener('load', function () {
    init();
    document.body.setAttribute('data-loaded', 'true');
    
});