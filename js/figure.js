import { generateCard, getData, Type } from './util.js';

const figures = await getData(Type.Figures);

$('.card-container').empty();

figures.forEach((figure) => {
    $('.card-container').append(
        generateCard(figure, (event) => {
            let cart_obj = $(event.target).attr('data');
            window.localStorage.setItem(`${window.localStorage.length}`, cart_obj);
            alert('Item Successfully Added!');
        })
    );
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
            generateCard(figure, (event) => {
                let cart_obj = $(event.target).attr('data');
                window.localStorage.setItem(`${window.localStorage.length}`, cart_obj);
                alert('Item Successfully Added!');
            })
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
                generateCard(figure, (event) => {
                    let cart_obj = $(event.target).attr('data');
                    window.localStorage.setItem(`${window.localStorage.length}`, cart_obj);
                    alert('Item Successfully Added!');
                })
            );
        }
    });
});
