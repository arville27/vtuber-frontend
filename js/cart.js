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

//validasi form
if (name.value == '') {
    alert('username must be filled');
} else if (!femaleBtn.checked && !maleBtn.checked) {
    alert('you must select your gender');
} else if (email.value == '') {
    alert('email must be filled');
} else if (phone.value == '') {
    alert('phone number must be filled');
} else if (address.value == '') {
    alert('address must be filled');
} else if (username.value.length < 3) {
    alert('username must be at least 3 characters');
} else if (!email.value.endsWith('@gmail.com')) {
    alert('Email not valid');
} else if (!phonenumber.startsWith('+81') && phonenumber.value.length != 11) {
    alert('Phone number not valid');
} else if (!address.value.endsWith('Street')) {
    alert('Address not valid');
}
