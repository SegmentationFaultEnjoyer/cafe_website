async function request(url, method = 'GET', data = null) {
    let req_body = {
        method, 
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            }
    }
    if(data == null) delete req_body.body;
    
    let response = await fetch(url, req_body);
    return await response.json();
}

module.exports = request;