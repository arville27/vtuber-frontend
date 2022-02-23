const navigation = $('#navigation');
const navToggle = $('#mobile-menu-toggle');
const dropDownMenu = $('.dropdown-menu-container');
const dropDownTab = $('.dropdown-tab');

dropDownTab.click((e) => {
    e.preventDefault();
    const target = $(e.target).attr('tab');
    localStorage.setItem('merch-tab', target);
    window.open('/merch.html', '_');
});

navToggle.click(() => {
    const status = navigation.attr('data-visible');
    navigation.attr('data-visible', status === 'true' ? 'false' : 'true');
});

$('body').on('click', (e) => {
    const isMobileNavbarVisible = navigation.attr('data-visible') === 'true';
    const isOutsideNavbarSpace = e.clientX > navigation[0].clientWidth;
    if (isOutsideNavbarSpace && isMobileNavbarVisible) navigation.attr('data-visible', 'false');
});

$('#navigation li:nth(3), .dropdown-menu-container').hover(
    () => {
        const isNavToggleButtonVisible = navToggle.css('display') !== 'none';
        if (!isNavToggleButtonVisible) dropDownMenu.css({ display: 'block' }).attr('data-visible', 'true');
    },
    () => dropDownMenu.css({ display: 'none' }).attr('data-visible', 'false')
);
