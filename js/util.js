const Type = Object.freeze({
    Talent: 0,
    Figures: 1,
    Merch: 2,
});

/**
 *
 * @param {String} name Talent name
 * @param {String} img Image Path
 */
function generateCardTalent(name, img) {
    const card = $('<div>', { class: 'card' });
    const pictContainer = $('<div>', { class: 'card-pict-container' });
    pictContainer.append($('<img>', { class: 'card-pict', src: img }));
    $(card).append(pictContainer);
    $(card).append($('<div>', { class: 'card-details' }).text(name));
    return card;
}

/**
 * @param {{name: string, img: string, type: string, price: Number}} item
 * @param {Number} count item count
 * @returns
 */
function generateCartItem({ name, img, type, price }, count) {
    const parent = $('<div>', { class: 'cart-item-container' });

    const checkboxContainer = $('<div>', { class: 'cart-checkbox-container' });
    checkboxContainer.append($('<input>', { class: 'cart-checkbox', type: 'checkbox' }));

    const cartPictContainer = $('<div>', { class: 'cart-pict-container' });
    cartPictContainer.append($('<img>', { class: 'cart-pict', src: img, alt: `Image of ${name}` }));

    const firstCartDetails = $('<div>', { class: 'cart-details-1' });
    firstCartDetails.append(
        $('<div>', { class: 'item-details-1' })
            .append($('<div>', { class: 'item-name' }).text(name))
            .append($('<div>', { class: 'item-type' }).text(type))
    );
    firstCartDetails.append(
        $('<div>', { class: 'item-details-2' })
            .append($('<span>', { class: 'subitem-btn' }).text('-'))
            .append($('<div>', { class: 'item-count' }).text(count))
            .append($('<span>', { class: 'additem-btn' }).text('+'))
    );

    const secondCartDetails = $('<div>', { class: 'cart-details-2' });
    secondCartDetails
        .append($('<div>', { class: 'item-price' }).text(numToPrice(price)))
        .append($('<div>', { class: 'cart-total' }).text(numToPrice(price * count)));

    return parent
        .append(checkboxContainer)
        .append(cartPictContainer)
        .append(firstCartDetails)
        .append(secondCartDetails);
}

/**
 *
 * @param {Number} num number to convert to price
 * @returns Price in string
 */
function numToPrice(num) {
    return num.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}

/**
 * @returns Array of merch/figure id
 */
function getUserCart() {
    const cartObject = { ...window.localStorage };
    const cart = [];
    for (const obj in cartObject) {
        cart.push(cartObject[obj]);
    }
    return cart;
}

/**
 *
 * @param {{Talent: Number, Figures: Number, Merch: Number}} type Type of data
 * @returns Data Object
 */
async function getData(type) {
    let data;
    switch (type) {
        case Type.Talent:
            data = await fetch('/data/talent.json');
            break;

        case Type.Figures:
            data = await fetch('/data/figure.json');
            break;

        case Type.Merch:
            data = await fetch('/data/merch.json');
            break;

        default:
            return {};
    }
    return await data.json();
}

function generateCard({ name, img, type, price, id }, callback) {
    const parent = `
    <div class="card">
    <div class="card-pict-container">
        <img class="card-pict" src="${img}" alt="${name}" />
    </div>
    <div class="card-details">
        <div class="item-name">${name}</div>
        <div class="item-type">${type}</div>
        <div class="item-price">${numToPrice(price)}</div>
    </div>
    </div>`;

    const cart = $(`<div data="${id}" class="material-icons card-carticon">shopping_cart</div>`);
    cart.click(callback);
    return $(parent).append(cart);
}

export { Type, generateCartItem, numToPrice, generateCard, getUserCart, getData, generateCardTalent };
