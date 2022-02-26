import { generateCartItem, getUserCart, numToPrice, noCartItems } from './util.js';

const container = $('.mycart-container');
const popup = $('.popup-container');
let tempCart = [];

// Utility function for cart
/**
 *
 * @param {Number} total Total amount of user's cart
 */
function setTotalPrice(total) {
    $('.total-price').text(numToPrice(total));
}

/**
 *
 * @param {Object[]} cart User carts
 */
function setUserCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCheckedItems() {
    return [...$('.cart-checkbox-container[data-check="true"]').map((_, el) => $(el).attr('data-id'))];
}

function validateForm() {
    const [name, genderMale, genderFemale, email, phone, address] = [
        $('#name'),
        $('#genderMale'),
        $('#genderFemale'),
        $('#email'),
        $('#phone'),
        $('#address'),
    ];

    if (name.val() === '') {
        return alert('Username must be filled');
    } else if (name.val().length < 3) {
        return alert('Username must be at least 3 characters');
    } else if (!genderMale.prop('checked') && !genderFemale.prop('checked')) {
        return alert('You must select your gender');
    } else if (email.val() === '') {
        return alert('Email must be filled');
    } else if (!email.val().includes('@') || !email.val().endsWith('.com')) {
        return alert('Email not valid');
    } else if (phone.val() === '') {
        return alert('Phone number must be filled');
    } else if (!phone.val().startsWith('+81') || phone.val().length !== 14) {
        return alert('Phone number not valid');
    } else if (address.val() === '') {
        return alert('Address must be filled');
    } else if (!address.val().endsWith('Street')) {
        return alert('Address not valid');
    }

    return true;
}

/**
 * Generate user's cart with new value
 */
function generateCartItems(customCart = null) {
    let userCart = customCart ?? getUserCart();
    if (userCart.length === 0) {
        setTotalPrice(0);
        return container.empty().append(noCartItems());
    }
    container.empty().append(userCart.map((item) => generateCartItem(item)));
    // cart item button handler
    $('.additem-btn, .subitem-btn').click((e) => {
        const buttonName = $(e.target).attr('class');
        const itemId = $(e.target).parent().attr('data-id');
        const item = userCart.find((i) => i.id === itemId);
        buttonName === 'additem-btn' ? item.count++ : item.count--;
        if (item.count === 0) {
            userCart = userCart.filter((i) => i.id !== item.id);
            $('.deleteicon').hide();
        }
        setUserCart(userCart);
        generateCartItems();
    });

    $('.cart-checkbox').click((e) => {
        const value = $(e.target).prop('checked');
        $(e.target).parent().attr('data-check', value);
        const checked = getCheckedItems();
        tempCart = [];
        if (checked.length === 0) {
            $('.deleteicon').hide();
            return generateCartItems();
        }
        $('.deleteicon').show();
        tempCart = userCart.filter((item) => checked.includes(item.id));
        setTotalPrice(
            tempCart.reduce((total, item) => {
                const currItem = userCart.find((i) => i.id === item.id);
                return total + currItem.price * currItem.count;
            }, 0)
        );
    });

    setTotalPrice(0);
}

$('.deleteicon').click((e) => {
    const checkedItems = getCheckedItems();
    const leftOver = getUserCart().filter((item) => !checkedItems.includes(item.id));
    setUserCart(leftOver);
    $(e.target).hide();
    generateCartItems();
});

$('.checkout-button').click(() => {
    const userCart = getUserCart();
    if (userCart.length === 0) return alert('Your cart is empty');
    if (tempCart.length === 0) return alert('Select all items you want to buy');
    popup.fadeIn(100).css('display', 'flex');
});

$('.material-icons.close-icon').click(() => popup.fadeOut(100));

$('#buy').click(() => {
    const userCart = getUserCart();
    if (validateForm()) {
        if (tempCart.length === userCart.length) {
            setUserCart([]);
            tempCart = [];
        } else if (tempCart.length > 0) {
            setUserCart(userCart.filter((item) => !tempCart.map((i) => i.id).includes(item.id)));
            tempCart = [];
        }
        $('.deleteicon').hide();
        popup.fadeOut(100);
        generateCartItems();
        alert('Successfully buy item');
    }
});

// Default action
generateCartItems();
