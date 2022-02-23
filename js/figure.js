import { generateCard, getData, Type } from './util.js';

const figures = await getData(Type.Figures);
const container = $('.card-container');
$('.search-closeicon').css({ display: 'none', cursor: 'pointer' });

// Utility function for merch
function generateResults(query = null) {
    const needFilter = !query;
    container
        .empty()
        .append(
            figures
                .filter((figure) => needFilter || figure.name.toLowerCase().includes(query.toLowerCase()))
                .map((figure) => generateCard(figure))
        );
}

function resetSearchbarIcon() {
    $('#searchbar').val('');
    $('.search-closeicon').hide();
    $('.search-searchicon').show();
}

// Default action
generateResults();

$('.search-closeicon').on('click', (e) => {
    resetSearchbarIcon();
    generateResults();
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
    generateResults(query);
});
