import { generateCartItem, getUserCart, Type, getData } from './util.js';

const [figures, merch] = [await getData(Type.Figures), await getData(Type.Merch)];
const cart = getUserCart();

const container = $('.mycart-container');

const userCartItems = [...figures, ...merch['poster'], ...merch['audio'], ...merch['shirt']].filter((item) =>
    cart.includes(item.id)
);

container.empty();
userCartItems.forEach((item) => {
    container.append(generateCartItem(item, 1));
});
