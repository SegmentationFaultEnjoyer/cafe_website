bcrypt = require('bcrypt');

async function hashing(password) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    
    return hash;
}

async function isMatch(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch
}

// async function main(){
//     let hash = await hashing('random_password')
//     let isatch = await isMatch('random_password', hash)
//     console.log(isatch);
// }

// main()