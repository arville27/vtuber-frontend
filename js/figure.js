import { generateCard } from './util.js';

const data = await fetch('/data/figure.json');
const figures = await data.json();

// Searchbar icon
$('.search-closeicon')
    .css({ display: 'none', cursor: 'pointer', color: 'black' })
    .click(() => {
        $('#searchbar').val('');
        $('.search-searchicon').css('display', 'block');
        $('.search-closeicon').css('display', 'none');
        $('.card-container').append(figures.map((talent) => generateCard(talent.name, talent.img)));
    });

$('.card-container').empty();

$('.card-container').append(figures.map((talent) => generateCard(talent.name, talent.img)));

$('#searchbar').keyup((e) => {
    const query = $(e.target).val();
    $('.search-searchicon').css('display', 'none');
    $('.search-closeicon').css('display', 'block');
    $('.card-container').empty();
    $('.card-container').append(
        figures
            .filter((talent) => talent.name.includes(query))
            .map((talent) => generateCard(talent.name, talent.img))
    );
});
