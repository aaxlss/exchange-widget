const DOMAIN='http://localhost:3001/';

const callAPI = (URL, options = {}, queryParams = null) => {
    if (queryParams){
        const queryString = queryParamsToString(queryParams)
        URL += `?${queryString}`;
    }
    return new Promise((resolve, reject) => {
        fetch(DOMAIN + URL,options)
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(error => reject(error))
    });
}


const queryParamsToString = (queryParams) => {
    let string = '';

    for (const [key, value] of Object.entries(queryParams)) {
        string += `${key}=${value}`;
    }

    return string;
}

export {callAPI}