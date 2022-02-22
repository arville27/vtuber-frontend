const header = $('.trans-on-scroll');
const navigation = $('#navigation');
const navToggle = $('#mobile-menu-toggle');
const merchandise = $('#navigation li:nth(3)');
const dropDownMenu = $('.dropdown-menu-container');
const dropDownTab = $('.dropdown-tab');

// dropDownTab.click((e) => {
//     e.preventDefault();
//     const target = $(e.target).attr('tab');
//     console.log(target);
// });

navToggle.click(() => {
    const status = navigation.attr('data-visible');
    navigation.attr('data-visible', status === 'true' ? 'false' : 'true');
});

$('body').click((e) => {
    if (e.clientX > navigation[0].clientWidth && navigation.attr('data-visible') === 'true') {
        navigation.attr('data-visible', 'false');
    }
});

window.addEventListener('click', () => {
    console.log();
});

[dropDownMenu, merchandise].forEach((el) => {
    el.hover(
        () => {
            if (navToggle.css('display') === 'none') {
                dropDownMenu.css({ display: 'block' }).attr('data-visible', 'true');
            }
        },
        () => {
            dropDownMenu.css({ display: 'none' }).attr('data-visible', 'false');
        }
    );
});
