import { Type, getData, generateCard } from './util.js';

const merchs = await getData(Type.Merch);

$('.card-container').empty();
for (const key in merchs) {
    filterTab(key);
}

//all
function filterTab(key) {
    merchs[key].forEach((element) => {
        $('.card-container').append(generateCard(element));
    });
}

$('.tab-item').click((e) => {
    $('.card-container').empty();
    if ($(e.target).parent().attr('type') === 'all') {
        for (const key in merchs) {
            filterTab(key);
        }
    } else {
        filterTab($(e.target).parent().attr('type'));
    }
    $('.active-tab').toggleClass('active-tab');
    $(e.target).toggleClass('active-tab');
    $('#searchbar').val('');
});

//Search
$('.search-closeicon').css({ display: 'none', cursor: 'pointer' });

$('.search-closeicon').click((e) => {
    $('#searchbar').val('');
    $('.search-closeicon').hide();
    $('.search-searchicon').show();

    $('.card-container').empty();
    let currTab = $('.active-tab').parent().attr('type');
    if (currTab === 'all') {
        filterTab('poster');
        filterTab('shirt');
        filterTab('audio');
    } else {
        filterTab(currTab);
    }
});

function searchTab(search_object, currTab) {
    merchs[currTab]
        .filter((e) => {
            if (e.name.toLowerCase().includes(search_object)) {
                return true;
            } else {
                return false;
            }
        })
        .forEach((element) => {
            $('.card-container').append(generateCard(element));
        });
}

$('#searchbar').on('input', function (e) {
    if ($(e.target).val() != '') {
        $('.search-closeicon').show();
        $('.search-searchicon').hide();
    } else {
        $('.search-closeicon').hide();
        $('.search-searchicon').show();
    }

    //filter
    let currTab = $('.active-tab').parent().attr('type');

    $('.card-container').empty();

    let search_object = $(e.target).val().toLowerCase();
    if (currTab === 'all') {
        searchTab(search_object, 'poster');
        searchTab(search_object, 'shirt');
        searchTab(search_object, 'audio');
    } else {
        searchTab(search_object, currTab);
    }
});
