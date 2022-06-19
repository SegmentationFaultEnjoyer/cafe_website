const type = require('./types.js');

function bring_soup_to_top(products) {
    let soup = products.find(el => el.type === type.SOUP);
    products = products.filter(el => el.type != type.SOUP);
    products.unshift(soup);
    return products;
}

module.exports = bring_soup_to_top;