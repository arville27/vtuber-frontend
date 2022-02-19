import { generateCard } from './util.js';

const data = await fetch('/data/figure.json');
const figures = await data.json();

const cartDom = $('<div>', { class: 'material-icons card-carticon' }).text('shopping_cart');

// Searchbar icon
$('.search-closeicon')
    .css({ display: 'none', cursor: 'pointer', color: 'black' })
    .click(() => {
        $('#searchbar').val('');
        $('.search-searchicon').css('display', 'block');
        $('.search-closeicon').css('display', 'none');
        $('.card-container').append(
            figures.map((figure) => generateCard(figure.name, figure.img, [cartDom]))
        );
    });

$('.card-container').empty();

$('.card-container').append(figures.map((figure) => generateCard(figure.name, figure.img, [cartDom])));

$('#searchbar').keyup((e) => {
    const query = $(e.target).val();
    $('.search-searchicon').css('display', 'none');
    $('.search-closeicon').css('display', 'block');
    $('.card-container').empty();
    $('.card-container').append(
        figures
            .filter((figure) => figure.name.includes(query))
            .map((figure) => generateCard(figure.name, figure.img, [cartDom]))
    );
});
