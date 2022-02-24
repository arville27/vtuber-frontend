const Type = Object.freeze({
    Talent: 0,
    Figures: 1,
    Merch: 2,
});

const [figures, merch] = [await getData(Type.Figures), await getData(Type.Merch)];

/**
 * @param {{name: string, img: string, type: string, price: Number}} item
 * @param {Number} count item count
 * @returns return new jQuery object
 */
function generateCartItem({ name, img, type, id, price, count }) {
    const parent = $('<div>', { class: 'cart-item-container' });

    const checkboxContainer = $('<div>', { class: 'cart-checkbox-container' });
    checkboxContainer
        .attr({ 'data-id': id, 'data-check': false })
        .append($('<input>', { class: 'cart-checkbox', type: 'checkbox' }));

    const cartPictContainer = $('<div>', { class: 'cart-pict-container' });
    cartPictContainer.append($('<img>', { class: 'cart-pict', src: img, alt: `Image of ${name}` }));

    const firstCartDetails = $('<div>', { class: 'cart-details-1' });
    firstCartDetails.append(
        $('<div>', { class: 'item-details-1' })
            .append($('<div>', { class: 'item-name' }).text(name))
            .append($('<div>', { class: 'item-type' }).text(type))
    );
    firstCartDetails.append(
        $('<div>', { class: 'harga' }).append($('<div>', { class: 'item-price' }).text(numToPrice(price)))
    );
    firstCartDetails.append(
        $('<div>', { class: 'item-details-2' })
            .attr('data-id', id)
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
 * @returns Array of obj {merch/figure id, count}
 */
function getUserCart() {
    return JSON.parse(localStorage.getItem('cart') ?? '[]');
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

/**
 *
 * @param {{name: string, img: string, type: string, price: Number, id: string}} Item
 * @returns return new jQuery object
 */
function generateCard({ name, img, type, price, id }) {
    let card = $('<div>', { class: 'card' });

    const pictContainer = $('<div>', { class: 'card-pict-container' });
    pictContainer.append($('<img>', { class: 'card-pict', src: img, alt: `${name}` }));

    const details = $('<div>', { class: 'card-details' });

    card.append(pictContainer).append(details);
    // Price is define then its item (merch, figure) else its talent
    if (price) {
        const cart = $('<div>', { class: 'material-icons card-carticon' })
            .attr({ 'data-id': id, 'data-type': type.toLowerCase() })
            .text('shopping_cart')
            .on('click', (event) => {
                let itemId = $(event.target).attr('data-id');
                let itemType = $(event.target).attr('data-type');
                let item;
                if (['shirt', 'poster', 'audio'].includes(itemType))
                    item = merch[itemType].find((i) => i.id === itemId);
                else item = figures.find((i) => i.id === itemId);
                const userCart = getUserCart();
                const itemInCart = userCart.find((i) => i.id === item.id);
                itemInCart ? itemInCart.count++ : userCart.push({ ...item, count: 1 });
                localStorage.setItem('cart', JSON.stringify(userCart));
                alert('Item Successfully Added!');
            });
        card = card.append(cart);
        details
            .append($('<div>', { class: 'item-name' }).text(name))
            .append($('<div>', { class: 'item-type' }).text(type))
            .append($('<div>', { class: 'item-price' }).text(numToPrice(price)));
    } else {
        details.text(name);
    }

    return card;
}

function noCartItems() {
    const container = $('<div>', { class: 'warning-container' });

    const card = $('<div>', { class: 'warning-card' });
    card.append($('<span>', { class: 'material-icons shoppingbag-icons' }).text('shopping_bag'))
        .append($('<span>', { class: 'warning' }).text('There is no item in your cart'))
        .append(
            $('<div>', { class: 'shop-btn-container' })
                .append(
                    $('<button>', { class: 'shop-btn figures-btn' })
                        .text('Figures')
                        .click(() => window.open('/figure.html', '_'))
                )
                .append(
                    $('<button>', { class: 'shop-btn merch-btn' })
                        .text('Merchandise')
                        .click(() => window.open('/merch.html', '_'))
                )
        );

    return container.append(card);
}

export { Type, generateCartItem, numToPrice, generateCard, getUserCart, getData, noCartItems };
