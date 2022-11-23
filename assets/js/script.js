$(window).resize(function() {
    if($(window).width() > 420) {
        $('.mc-widow').html("&nbsp;");
    } else {
        $('.mc-widow').text(" ");
    }
});

gsap.registerPlugin(ScrollTrigger);

gsap.to(".mc-feature", {
    scrollTrigger: {
        trigger: ".mc-feature-container",
        scrub: true,
    },
    scale: 1,
    duration: 1
});

barba.hooks.afterLeave(() => {
    let count = 0;
    let triggers = ScrollTrigger.getAll();
    triggers.forEach(function(trigger) {
        count += 1;
        trigger.kill();
    });
});

barba.hooks.beforeEnter(() => {
    window.scrollTo(0, 0);
})

barba.hooks.afterEnter(() => {
    mcTop();
    mcColophon();
});

barba.hooks.after(() => {
    mcScaleAnim();
    mcMenu();
});

barba.init({
    transitions: [{
        leave(data) {
            return gsap.to(data.current.container, {
                opacity: 0,
            });
        },
        beforeEnter: ({next}) => {
            reinitOpacity();
        },
        enter(data) {
            gsap.to(data.next.container, {
                opacity: 1,
                delay: 0.2
            });
        },
    }]
});

function reinitOpacity() {
    $('main').css("opacity", "0");
}

function mcMenu() {
    $('#mcNavToggler').click(function() {
        $('.mc-nav-right').toggleClass('mc-nav-right-on');
        $('#mcNavToggler').toggleClass('open');
        if($('.mc-nav-right').hasClass('mc-nav-right-on')) {
            $('html, body').css({
                overflow: 'hidden',
                height: '100%'
            });
        } else {
            $('html, body').css({
                overflow: 'auto',
                height: 'auto'
            });
        }
    });
}

function mcScaleAnim() {
    gsap.to(".mc-feature", {
        scrollTrigger: {
            trigger: ".mc-feature-container",
            scrub: true,
        },
        scale: 1,
        duration: 1
    });
}

function mcTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function mcColophon() {
    $(document).ready(function() {
        $('.mc-colophon').click(function() {
            if($('.mc-show-colophon').css('visibility') == "hidden") {
                $('.mc-show-colophon').css('visibility', 'visible');
                $('.mc-show-colophon').css('opacity', 1);
            } else {
                $('.mc-show-colophon').css('visibility', 'hidden');
                $('.mc-show-colophon').css('opacity', 0);
            }
        });
    });
}