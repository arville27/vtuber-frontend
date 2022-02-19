/**
 *
 * @param {String} name Talent name
 * @param {String} img Image Path
 */
function generateCard(name, img) {
    const card = $('<div>', { class: 'card' });
    const pictContainer = $('<div>', { class: 'card-pict-container' });
    $(pictContainer).append($('<img>', { class: 'card-pict', src: img }));
    $(card).append(pictContainer);
    $(card).append($('<div>', { class: 'card-details' }).text(name));
    return card;
}

export { generateCard };
