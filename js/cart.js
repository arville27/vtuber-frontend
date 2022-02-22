import { generateCartItem, getUserCart, Type, getData, numToPrice } from './util.js';

const [figures, merch] = [await getData(Type.Figures), await getData(Type.Merch)];

// Cart item generator
const cart = getUserCart();

const container = $('.mycart-container');

const userCartItemCount = new Map();
cart.forEach((id) => {
    if (userCartItemCount.has(id)) userCartItemCount.set(id, userCartItemCount.get(id) + 1);
    else userCartItemCount.set(id, 1);
});

let totalPrice = 0;
[...figures, ...merch['poster'], ...merch['shirt'], ...merch['audio']].forEach((item) => {
    if (userCartItemCount.has(item.id)) {
        container.append(generateCartItem(item, userCartItemCount.get(item.id)));
        totalPrice += item.price * userCartItemCount.get(item.id);
    }
});

$('.total-price').text(numToPrice(totalPrice));

// cart item button handler
$('.additem-btn, .subitem-btn').click((e) => {
    const domCounter = $(e.target).parent().children('.item-count');
    console.log($(e.target).attr('class'));
    if ($(e.target).attr('class') === 'additem-btn') {
        domCounter.text(parseInt(domCounter.text()) + 1);
    } else {
        domCounter.text(parseInt(domCounter.text()) - 1);
    }
});
