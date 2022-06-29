const webp = require('webp-converter');
const {join} = require('path');
const {fs} = require('./components');

webp.grant_permission();

function convertToWebp(path, name) {
    const result = webp.cwebp(join(path, name), join(path, transformName(name)),"-q 80",logging="-v");
    result
        .then((response) => {
            console.log('CONVERTED TO WEBP');
            fs.unlinkSync(join(path, name));
        })
        .catch(e => {
            console.error(e.message);
        }) 
}

function transformName(name) {
    let [base, ext] = name.split('.');
    return `${base}.webp`
}

module.exports = convertToWebp;
