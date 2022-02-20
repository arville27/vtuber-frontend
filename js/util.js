/**
 *
 * @param {String} name Talent name
 * @param {String} img Image Path
 * @param {Object[]} extraChildren Extra children to add to DOM
 */
function generateCard(name, img, extraChildren = []) {
    const card = $('<div>', { class: 'card' });
    const pictContainer = $('<div>', { class: 'card-pict-container' });
    $(pictContainer).append($('<img>', { class: 'card-pict', src: img }));
    $(card).append(pictContainer);
    $(card).append($('<div>', { class: 'card-details' }).text(name));
    if (extraChildren.length > 0) {
        extraChildren.forEach((element) => $(card).append(element.clone()));
    }
    return card;
}

export { generateCard };
