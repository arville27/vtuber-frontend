// import { generateCard } from './util.js';

const data = await fetch('/data/merch.json');
const merchs = await data.json();

function numberToStringPrice(num) {
    return num.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}

function generateCard(id, name, type, price, img) {
    return `
    <div class="card">
    <div class="card-pict-container">
        <img class="card-pict" src="${img}" alt="${name}" />
    </div>
    <div class="card-details">
        <div class="item-name">${name}</div>
        <div class="item-type">${type}</div>
        <div class="item-price">${price}</div>
    </div>
    <div data="${id}" class="material-icons card-carticon">shopping_cart</div>
    </div>`;
}

$('.card-container').empty();
for (const key in merchs) {
    filterTab(key);
}

//all
function filterTab(key) {
    merchs[key].forEach((element) => {
        $('.card-container').append(
            generateCard(
                element.id,
                element.name,
                key,
                numberToStringPrice(parseInt(element.price)),
                element.img
            )
        );
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

//Add to Cart
$('.card-carticon').click((event) => {
    let cart_obj = $(event.target).attr('data');
    window.localStorage.setItem(`${window.localStorage.length}`, cart_obj);
    alert('Item Successfully Added!');
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
            $('.card-container').append(
                generateCard(
                    element.id,
                    element.name,
                    currTab,
                    numberToStringPrice(parseInt(element.price)),
                    element.img
                )
            );
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
