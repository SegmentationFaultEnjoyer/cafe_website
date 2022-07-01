const webp = require('webp-converter');
const {join} = require('path');
const {fs} = require('./components');
const filesystem = require ('fs.extra');

webp.grant_permission();

function convertToWebp(path, name, dest = null) {
    const result = webp.cwebp(join(path, name), join(path, transformName(name)),"-q 80",logging="-v");
    result
        .then((response) => {
            console.log('CONVERTED TO WEBP');
            fs.unlinkSync(join(path, name));

            if(dest != null) {
                move(path, dest, transformName(name));
            }
        })
        .catch(e => {
            console.error(e.message);
        }) 
}

function transformName(name) {
    let [base, ext] = name.split('.');
    return `${base}.webp`
}

function move(src, dest, name) {
    filesystem.move(
        join(src, name),
        join(dest, name),
        err => {
            if(err) {throw err};
            console.log (`Moved ${name} to folder 'location'`);
        }
    )
}

module.exports = convertToWebp;
