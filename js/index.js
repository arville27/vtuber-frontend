$('.material-icons.video').click((e) => {
    const container = $('.video-container');
    const active = $('.active-video');
    const [prev, current, next] = [active.prev(), active, active.next()];

    current.fadeOut().toggleClass('active-video');
    if ($(e.target).attr('id') === 'slider-next') {
        next.fadeIn().toggleClass('active-video');
        container.append(prev);
    } else {
        prev.fadeIn().toggleClass('active-video');
        container.prepend(next);
    }
});
