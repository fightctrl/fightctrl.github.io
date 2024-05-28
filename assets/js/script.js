Splitting();

function reinitScroll() {
    $('body').removeClass('no-scroll');
}

function openMenu() {
    $('#nav-toggler').click(function() {
        $('.menu').toggleClass('menu-on');
        $('#nav-toggler').toggleClass('open');
        if($('.menu').hasClass('menu-on')) {
            $('body').addClass('no-scroll');
        } else {
            $('body').removeClass('no-scroll');
        }
    });
}

function openColophon() {
    $(document).ready(function() {
        $('.toggle-colophon').click(function() {
            $('.colophon-overlay').toggleClass('colophon-overlay-on');
        });
    });
}

function closeColophon() {
    $(document).ready(function() {
        $('.close-colophon').click(function() {
            $('.colophon-overlay-on').removeClass('colophon-overlay-on').addClass('colophon-overlay');
        });
    });
}

function textAnim() {
    gsap.from('.char', {
        opacity: 0,
        y: 30,
        stagger: 0.02
    });
}

function leaveTransition() {
    // return gsap.to('main', {
    //     opacity: 0,
    //     duration: 2
    // });
    return gsap.timeline()
        .to('.swipe-transition', {
            scaleY: 1,
            transformOrigin: 'top',
            duration: 0.7
        })
        .to('.swipe-transition', {
            scaleY: 0,
            transformOrigin: 'bottom',
            duration: 0.6,
            delay: -0.1
        })
}

function enterTransition() {
    return gsap.from('main', {
        opacity: 0,
        delay: 1
    });
}

function bootstrapCarousel() {
    $('.carousel').carousel();
}

barba.hooks.beforeEnter(() => {
    window.scrollTo(0, 0);
    Splitting();
});

barba.hooks.afterEnter(() => {
    reinitScroll();
    openMenu();
    openColophon();
    closeColophon();
    textAnim();
    bootstrapCarousel();
});

barba.hooks.after(() => {
    openMenu();
});

barba.init({
    transitions: [{
        leave: ({current}) => {
            leaveTransition();
        },
        enter: ({next}) => {
            enterTransition();
        },
    }]
});