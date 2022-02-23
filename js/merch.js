import { Type, getData, generateCard } from './util.js';

const merchs = await getData(Type.Merch);
const container = $('.card-container');
$('.search-closeicon').css({ display: 'none', cursor: 'pointer' });

// Utility function for merch
/**
 *
 * @param {string} tabTarget Tab name to give active indicator
 */
function switchTabIndicator(tabTarget) {
    $('.active-tab').toggleClass('active-tab');
    $(`div[type=${tabTarget}] span`).toggleClass('active-tab');
}

/**
 *
 * @param {string} key Tab name
 * @param {string} query Query to filter search result
 */
function filterTab(key, query = null) {
    const listMerchs =
        key === 'all' ? [...merchs['poster'], ...merchs['shirt'], ...merchs['audio']] : merchs[key];
    const needFilter = !query;
    container
        .empty()
        .append(
            listMerchs
                .filter((item) => needFilter || item.name.toLowerCase().includes(query.toLowerCase()))
                .map((item) => generateCard(item))
        );
}

function resetSearchbarIcon() {
    $('#searchbar').val('');
    $('.search-closeicon').hide();
    $('.search-searchicon').show();
}

// Default action
const merchTab = localStorage.getItem('merch-tab');
filterTab(merchTab);
switchTabIndicator(merchTab);
localStorage.setItem('merch-tab', 'all');

$('.tab-item').click((e) => {
    const targetTab = $(e.target).parent().attr('type');
    filterTab(targetTab);
    switchTabIndicator(targetTab);
    resetSearchbarIcon();
});

$('.search-closeicon').click(() => {
    resetSearchbarIcon();
    let currTab = $('.active-tab').parent().attr('type');
    filterTab(currTab);
});

$('#searchbar').on('input', function (e) {
    const query = $(e.target).val();
    if (query !== '') {
        $('.search-closeicon').show();
        $('.search-searchicon').hide();
    } else {
        $('.search-closeicon').hide();
        $('.search-searchicon').show();
    }

    let currTab = $('.active-tab').parent().attr('type');
    filterTab(currTab, query);
});
