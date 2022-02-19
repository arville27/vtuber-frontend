$('.card-container').empty();

const data = await fetch('/data/talent.json');
const talents = await data.json();

const allTalents = [];
for (const nation in talents) {
    allTalents.push(...talents[nation].talents);
}

$('.card-container').append(allTalents.map((talent) => generateTalentCard(talent.name, talent.img)));

$('select').change(() => {
    const gen = parseInt($('select#generation').val());
    const nation = $('select#nationality').val();
    $('.card-container').empty();
    if (nation === 'all') {
        $('.card-container').append(
            allTalents
                .filter((talent) => gen === 0 || talent.gen === gen)
                .map((talent) => generateTalentCard(talent.name, talent.img))
        );
    } else {
        $('.card-container').append(
            talents[nation].talents
                .filter((talent) => gen === 0 || talent.gen === gen)
                .map((talent) => generateTalentCard(talent.name, talent.img))
        );
    }
});

/**
 *
 * @param {String} name Talent name
 * @param {String} img Image Path
 */
function generateTalentCard(name, img) {
    const card = $('<div>', { class: 'card' });
    const pictContainer = $('<div>', { class: 'card-pict-container' });
    $(pictContainer).append($('<img>', { class: 'card-pict', src: img }));
    $(card).append(pictContainer);
    $(card).append($('<div>', { class: 'card-details' }).text(name));
    return card;
}
