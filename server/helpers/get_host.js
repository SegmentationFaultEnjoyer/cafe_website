function get_host() {
    const ifaces = require('os').networkInterfaces();
    const localhost = Object.keys(ifaces).reduce((host,ifname) => {
    let iface = ifaces[ifname].find(iface => !('IPv4' !== iface.family || iface.internal !== false));
    return iface? iface.address : host;
}, '127.0.0.1');
    return localhost;
}

module.exports = get_host;