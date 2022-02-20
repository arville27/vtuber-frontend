// import { generateCard } from './util.js';

const data = await fetch('/data/figure.json');
const figures = await data.json();

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

figures.forEach((figure) => {
    $('.card-container').append(
        generateCard(
            figure.id,
            figure.name,
            figure.type,
            numberToStringPrice(parseInt(figure.price)),
            figure.img
        )
    );
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
    figures.forEach((figure) => {
        $('.card-container').append(
            generateCard(
                figure.id,
                figure.name,
                figure.type,
                numberToStringPrice(parseInt(figure.price)),
                figure.img
            )
        );
    });
});

$('#searchbar').on('input', function (e) {
    if ($(e.target).val() != '') {
        $('.search-closeicon').show();
        $('.search-searchicon').hide();
    } else {
        $('.search-closeicon').hide();
        $('.search-searchicon').show();
    }

    //filter
    // ubah input ke lowercase
    // loop jsonnya -> if include di search -> generate card
    $('.card-container').empty();
    let search_object = $(e.target).val().toLowerCase();
    figures.forEach((figure) => {
        if (figure.name.toLowerCase().includes(search_object)) {
            $('.card-container').append(
                generateCard(
                    figure.id,
                    figure.name,
                    figure.type,
                    numberToStringPrice(parseInt(figure.price)),
                    figure.img
                )
            );
        }
    });
});
