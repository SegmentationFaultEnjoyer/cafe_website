function *id_generator() {
    let id = 0;
    while(true) {
        yield id++;
    }
}

module.exports = id_generator();